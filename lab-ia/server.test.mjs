import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { createLab, analyze, validateResult } from './server.mjs';

const result = { score: 65, contexto_insuficiente: true, sinais: ['Segredo imposto'], explicacao: 'Um presente está condicionado ao segredo.', contexto_faltante: 'Relação entre participantes.' };
const provider = () => new Response(JSON.stringify({ model: 'test-model', stop_reason: 'end_turn', content: [{ type: 'text', text: JSON.stringify(result) }] }));

async function lab(t, options = {}) {
  const server = createLab({ apiKey: 'fake-test-key', cooldownMs: 0, fetchImpl: async () => provider(), ...options });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => { server.close(resolve); server.closeAllConnections(); }));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const session = await fetch(origin + '/api/session', { headers: { 'sec-fetch-site': 'same-origin' } }).then(r => r.json());
  const post = (body, headers = {}) => fetch(origin + '/api/analyze', { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json', 'X-CAPAI-Token': session.token, ...headers }, body: JSON.stringify(body) });
  return { origin, post, session };
}
test('envia somente após consentimento e retorna dados validados sem chave', async t => {
  let calls = 0;
  const x = await lab(t, { fetchImpl: async (url, opts) => {
    calls++;
    assert.equal(url, 'https://api.anthropic.com/v1/messages');
    assert.equal(opts.headers['x-api-key'], 'fake-test-key');
    const body = JSON.parse(opts.body);
    assert.equal(body.output_config.format.type, 'json_schema');
    assert.equal(JSON.parse(body.messages[0].content).conversa_ficticia, 'A: teste fictício');
    return provider();
  } });
  assert.equal((await x.post({ conversation: 'A: teste fictício' })).status, 400);
  assert.equal(calls, 0);
  const response = await x.post({ conversation: 'A: teste fictício', consent: true });
  assert.equal(response.status, 200);
  const text = await response.text();
  assert.equal(JSON.parse(text).result.score, 65);
  assert.ok(!text.includes('fake-test-key'));
  assert.ok(!JSON.stringify(x.session).includes('fake-test-key'));
  assert.equal(calls, 1);
});
test('rejeita origem, token, host, acesso a arquivos e sessão cross-site', async t => {
  const x = await lab(t, { fetchImpl: async () => assert.fail('Não deve chamar API') });
  const body = { conversation: 'Fictícia', consent: true };
  assert.equal((await x.post(body, { Origin: 'https://example.org' })).status, 403);
  assert.equal((await x.post(body, { 'X-CAPAI-Token': 'wrong' })).status, 403);
  assert.equal((await fetch(x.origin + '/api/session', { headers: { 'sec-fetch-site': 'cross-site' } })).status, 403);
  const badHostStatus = await new Promise((resolve, reject) => {
    http.get(x.origin, { headers: { Host: 'attacker.example' } }, response => { response.resume(); resolve(response.statusCode); }).on('error', reject);
  });
  assert.equal(badHostStatus, 403);
  assert.equal((await fetch(x.origin + '/server.mjs')).status, 404);
  assert.equal((await fetch(x.origin + '/.env')).status, 404);
  const page = await fetch(x.origin);
  assert.match(page.headers.get('content-security-policy'), /frame-ancestors 'none'/);
  assert.equal(page.headers.get('access-control-allow-origin'), null);
});
test('valida limites e chave ausente antes de qualquer chamada externa', async t => {
  const x = await lab(t, { apiKey: '', fetchImpl: async () => assert.fail('Não deve chamar API') });
  assert.equal((await x.post({ conversation: '', consent: true })).status, 400);
  assert.equal((await x.post({ conversation: 'a'.repeat(6001), consent: true })).status, 400);
  assert.equal((await x.post({ conversation: 'Fictícia', consent: true })).status, 503);
});
test('não transforma falhas da API em avaliações e não vaza corpo do provedor', async () => {
  for (const status of [400, 401, 403, 404, 429, 500, 529]) {
    await assert.rejects(analyze({ conversation: 'X', apiKey: 'fake', model: 'test', fetchImpl: async () => new Response('private upstream detail', { status }) }), err => err.status === 502 && !err.message.includes('private'));
  }
});
test('rejeita recusa, truncamento, JSON inválido e score fora da faixa', async () => {
  for (const data of [
    { stop_reason: 'refusal', content: [] },
    { stop_reason: 'max_tokens', content: [] },
    { stop_reason: 'end_turn', content: [{ type: 'text', text: 'not json' }] },
    { stop_reason: 'end_turn', content: [{ type: 'text', text: JSON.stringify({ ...result, score: 101 }) }] }
  ]) await assert.rejects(analyze({ conversation: 'X', apiKey: 'fake', model: 'test', fetchImpl: async () => new Response(JSON.stringify(data)) }), { status: 502 });
  assert.throws(() => validateResult({ ...result, sinais: [123] }));
  assert.throws(() => validateResult({ ...result, extra: 'unexpected' }));
});
test('timeout e erro de rede não produzem resultado', async () => {
  await assert.rejects(analyze({ conversation: 'X', apiKey: 'fake', model: 'test', fetchImpl: async () => { throw new DOMException('Timeout', 'TimeoutError'); } }), { status: 504 });
  await assert.rejects(analyze({ conversation: 'X', apiKey: 'fake', model: 'test', fetchImpl: async () => { throw new TypeError('network'); } }), { status: 502 });
});
test('bloqueia análises simultâneas', async t => {
  let finish;
  let started;
  const waiting = new Promise(resolve => { started = resolve; });
  const x = await lab(t, { fetchImpl: async () => { started(); return new Promise(resolve => { finish = () => resolve(provider()); }); } });
  const first = x.post({ conversation: 'Fictícia', consent: true });
  await waiting;
  try { assert.equal((await x.post({ conversation: 'Outra', consent: true })).status, 429); }
  finally { finish(); }
  assert.equal((await first).status, 200);
});
test('impõe intervalo entre pedidos', async t => {
  const x = await lab(t, { cooldownMs: 3000 });
  assert.equal((await x.post({ conversation: 'Fictícia', consent: true })).status, 200);
  assert.equal((await x.post({ conversation: 'Outra', consent: true })).status, 429);
});
