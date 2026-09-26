'use strict';

// Each outcome is scripted. This is not a classifier or an AI integration.
const scenarios = {
  friends: {
    messages: [['Colega', 'Sou o João da sua turma. Vamos jogar depois da aula?'], ['Participante', 'Vou perguntar para minha mãe primeiro.'], ['Colega', 'Tudo bem, combinamos depois.']],
    title: 'Exemplo sem alerta programado',
    reason: 'O roteiro mostra colegas combinando um jogo e respeitando a decisão de consultar um responsável. Este resultado predefinido não garante a segurança de conversas reais.',
    target: null
  },
  unknown: {
    messages: [['Desconhecido', 'Posso te dar um item raro.'], ['Participante', 'Mas eu não te conheço.'], ['Desconhecido', 'Só se vier conversar em privado e não contar aos seus pais.']],
    title: 'Alerta programado: presente condicionado e segredo',
    reason: 'Neste roteiro, uma pessoa desconhecida condiciona um presente a ir para o privado e esconder a conversa dos responsáveis. A demonstração permite ocultar a mensagem para mostrar uma possível ação da interface.',
    target: 2
  },
  uncertain: {
    messages: [['Jogador', 'Quer entrar no nosso grupo para jogar?'], ['Participante', 'Quem está no grupo?']],
    title: 'Exemplo com contexto insuficiente',
    reason: 'O roteiro não informa quem conhece quem nem o contexto do convite. Um convite isolado não permite concluir que existe aliciamento. Nenhuma ocultação foi programada para este exemplo.',
    target: null
  }
};

const select = document.getElementById('scenario');
const messages = document.getElementById('messages');
const result = document.getElementById('result');
const evaluate = document.getElementById('evaluate');
const actions = document.getElementById('actions');
const visibility = document.getElementById('visibility');
let concealed = false;
let evaluated = false;

function renderMessages() {
  const scenario = scenarios[select.value];
  messages.replaceChildren();
  scenario.messages.forEach(([speaker, text], index) => {
    const item = document.createElement('li');
    const label = document.createElement('strong');
    label.textContent = speaker;
    const content = document.createElement('span');
    content.textContent = concealed && index === scenario.target ? 'Mensagem ocultada nesta demonstração.' : text;
    item.append(label, content);
    messages.append(item);
  });
}

function reset() {
  concealed = false;
  evaluated = false;
  result.replaceChildren();
  actions.hidden = true;
  evaluate.disabled = false;
  visibility.textContent = 'Ocultar mensagem neste exemplo';
  renderMessages();
}

evaluate.addEventListener('click', () => {
  const scenario = scenarios[select.value];
  const title = document.createElement('strong');
  title.textContent = scenario.title;
  const reason = document.createElement('p');
  reason.textContent = scenario.reason;
  result.replaceChildren(title, reason);
  evaluated = true;
  actions.hidden = scenario.target === null;
  evaluate.disabled = true;
});

visibility.addEventListener('click', () => {
  if (!evaluated || scenarios[select.value].target === null) return;
  concealed = !concealed;
  visibility.textContent = concealed ? 'Mostrar mensagem novamente' : 'Ocultar mensagem neste exemplo';
  renderMessages();
});
select.addEventListener('change', reset);
document.getElementById('reset').addEventListener('click', reset);
reset();
