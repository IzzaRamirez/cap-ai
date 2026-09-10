# CAP AI — Motor de detecção de aliciamento infantil (grooming)

O **CAP AI** é uma inteligência artificial preventiva que analisa conversas digitais de crianças e adolescentes (YouTube, Discord e similares) e detecta **estruturas de aliciamento (grooming)** antes que o dano aconteça. A solução opera em três camadas:

1. **Captura** — a mensagem é lida na interface após ser exibida, sem retenção nem atraso na entrega;
2. **Análise** — a IA "Sentinela" avalia a conversa inteira em contexto e gera um score de risco (0–100);
3. **Ação preventiva** — alerta ao responsável com o trecho crítico e a explicação, e aviso educativo à criança.

> ⚠️ **Estado atual:** este repositório contém a banca de teste do motor de análise (camada 2) — um protótipo de validação técnica. Nenhuma criança real é monitorada; todas as conversas são **sintéticas e inventadas**.

## O que há neste repositório

| Arquivo | O que é |
|---|---|
| `index.html` | Banca de teste: interface que roda 24 conversas simuladas (13 de perigo, 11 inocentes) contra o motor de análise e mede acertos, perigos que passaram e — a métrica mais importante — **alarmes falsos**. |

O "cérebro" do motor é um prompt em português, editável na própria interface, que instrui o modelo Claude (Anthropic) a analisar a **estrutura da conversa** — nunca palavras isoladas — e a classificar o risco em quatro padrões principais:

- **Migração de plataforma** — levar a criança para um canal mais privado;
- **Isca de moeda virtual** — robux/skins oferecidos de forma condicional suspeita;
- **Recompensa por ato nocivo** — prêmio condicionado a autolesão ou "desafios";
- **Extração financeira** — induzir pix, uso escondido do cartão dos pais.

## Como rodar a banca de teste

1. Abra o `index.html` no navegador (ou acesse via GitHub Pages).
2. Crie uma chave de API em [console.anthropic.com](https://console.anthropic.com) e cole no campo **Chave de API**. A chave fica salva apenas no seu navegador (localStorage).
3. Teste uma conversa individual ou clique em **"Rodar as 24"** para medir a precisão do lote completo. O resultado pode ser exportado em CSV.

## 🔒 Segurança da chave de API

Nunca coloque a chave de API no código nem faça commit dela no GitHub. Uma chave publicada em repositório público é considerada comprometida (mesmo que removida depois, permanece no histórico do git) e deve ser **revogada imediatamente** no console da Anthropic. Este protótipo chama a API direto do navegador apenas por ser um instrumento de pesquisa; em produção, toda chamada deve passar por um backend próprio que guarda a chave em variável de ambiente.

## Métricas

A métrica prioritária do projeto é a **taxa de alarmes falsos**: um sistema de proteção infantil que dispara alertas em conversas normais entre crianças perde a confiança dos pais e invade a privacidade da criança sem necessidade. Em seguida:

- **Recall de perigo** (perigos detectados / perigos totais) — o custo de um perigo que passa é altíssimo;
- **Precisão** (alertas corretos / alertas emitidos).

O limiar atual de disparo é `score >= 51` (níveis *médio* e *alto*).

## Estratégia de produto: o motor é o produto, não o app

Um aplicativo de celular **não consegue** interceptar mensagens dentro do Roblox, YouTube ou Discord: iOS e Android isolam os aplicativos entre si, e os termos de uso dessas plataformas proíbem interceptação. Por isso a direção do projeto é tratar a **IA Sentinela como o ativo central** — um motor de detecção de grooming em português — entregue nos 12 meses por **extensão de navegador (B2C)** e **bot de moderação Discord (B2B)**, canais que funcionam de verdade e operam sem interferir na entrega das mensagens:

| Canal de entrega | Como funciona | Viabilidade |
|---|---|---|
| Extensão de navegador | Analisa o chat nas versões web (Discord web, YouTube) | **Alta — canal B2C, modelo de receita principal** |
| Bot de moderação (Discord) | Bot oficial instalado em servidores, com permissões legítimas de moderação, via API pública | **Alta — canal B2B** |
| API / SDK para plataformas | A própria plataforma chama o motor antes de exibir a mensagem | Alta como expansão futura, dependente de parceria |
| Integração com contas (modelo Bark/Qustodio) | Pais conectam as contas da criança; o serviço analisa as mensagens via API das plataformas | Média (depende das APIs disponíveis) |
| App móvel espelhando a tela | Interceptação no dispositivo | **Inviável** (sandbox do SO + termos de uso) |

## Ética e conformidade legal (Brasil)

O desenvolvimento é alinhado à **LGPD** (Lei 13.709/2018, art. 14 — tratamento de dados de crianças e adolescentes), ao **ECA** (Lei 8.069/1990) e à **ECA Digital** (Lei 15.211/2025). O design prevê minimização de dados, consentimento do responsável, transparência com a criança sobre a existência da ferramenta e calibragem dos alertas por faixa etária.
