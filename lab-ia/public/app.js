'use strict';
const $ = id => document.getElementById(id);
const examples = {
  friends: 'A: Sou o João da sua turma. Vamos jogar depois da aula?\nB: Vou perguntar para minha mãe primeiro.\nA: Tudo bem, combinamos depois.',
  risk: 'A: Posso te dar um item raro.\nB: Mas eu não te conheço.\nA: Só se vier conversar em privado e não contar aos seus pais.',
  uncertain: 'A: Quer entrar no nosso grupo para jogar?\nB: Quem está no grupo?'
};
let session = null;
let busy = false;
function invalidate() {
  $('result').hidden = true;
  $('details').replaceChildren();
  $('status').textContent = '';
  $('consent').checked = false;
  $('count').textContent = `${$('conversation').value.length} / 6000 caracteres`;
}
function lock(value) {
  busy = value;
  for (const id of ['conversation', 'example', 'consent', 'clear']) $(id).disabled = value;
  $('analyze').disabled = value || !session?.configured;
  $('analyze').textContent = value ? 'Aguardando a IA…' : 'Enviar à IA e analisar';
}
function paragraph(label, text) {
  const p = document.createElement('p');
  const strong = document.createElement('strong');
  strong.textContent = label + ': ';
  p.append(strong, document.createTextNode(text));
  $('details').append(p);
}
async function connect() {
  try {
    const response = await fetch('/api/session');
    if (!response.ok) throw Error();
    session = await response.json();
    $('connection').textContent = session.configured ? `Servidor pronto · ${session.model}. A chave será validada na primeira análise.` : 'Sem chave. Feche o servidor e execute INICIAR-IA.cmd.';
  } catch { $('connection').textContent = 'Não foi possível conectar. Inicie o laboratório e abra http://127.0.0.1:8765.'; }
  lock(false);
}
$('conversation').addEventListener('input', invalidate);
$('example').addEventListener('change', () => { $('conversation').value = examples[$('example').value] || ''; invalidate(); });
$('clear').addEventListener('click', () => { $('conversation').value = ''; $('example').value = ''; invalidate(); $('conversation').focus(); });
$('form').addEventListener('submit', async event => {
  event.preventDefault();
  if (busy || !session?.configured || !$('consent').checked || !$('conversation').value.trim()) return;
  const conversation = $('conversation').value;
  $('result').hidden = true;
  $('details').replaceChildren();
  lock(true);
  $('status').textContent = 'Enviando o texto à Anthropic. Aguarde; não há repetição automática de cobranças.';
  try {
    const response = await fetch('/api/analyze', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-CAPAI-Token': session.token }, body: JSON.stringify({ conversation, consent: true }), signal: AbortSignal.timeout(70000) });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Análise não concluída.');
    const r = data.result;
    paragraph('Pontuação experimental', `${r.score}/100 — não é uma probabilidade nem garantia de segurança.`);
    paragraph('Contexto', r.contexto_insuficiente ? 'Insuficiente para uma conclusão firme.' : 'A IA considerou o contexto suficiente; revise a avaliação.');
    paragraph('Sinais observados', r.sinais.length ? r.sinais.join('\n') : 'Nenhum sinal listado pela IA. Isso não garante ausência de risco.');
    paragraph('Explicação', r.explicacao);
    if (r.contexto_faltante) paragraph('Informações que faltam', r.contexto_faltante);
    paragraph('Registro desta execução', `${data.model} · ${data.promptVersion} · ${new Date(data.analyzedAt).toLocaleString('pt-BR')}`);
    $('result').hidden = false;
    $('status').textContent = 'Resposta recebida. Nenhuma mensagem ou contato foi bloqueado.';
  } catch (error) {
    $('status').textContent = error.name === 'TimeoutError' ? 'Tempo esgotado. Não há avaliação; a API pode ter processado o pedido.' : (error instanceof TypeError ? 'Conexão interrompida. Confira a janela do servidor.' : error.message);
  } finally { $('consent').checked = false; lock(false); }
});
connect();
