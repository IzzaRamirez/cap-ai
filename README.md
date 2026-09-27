# CAP AI — Protótipos para pesquisa sobre aliciamento em conversas

O **CAP AI** investiga como usar IA para identificar sinais de aliciamento (grooming) e manipulação em conversas em português. O projeto já tinha uma banca de testes com IA; a extensão e o laboratório local foram acrescentados depois.

**Estado atual:** protótipos experimentais para conversas fictícias. Há análise manual com IA e uma simulação de interface. Ainda não há leitura automática de chats de outros sites, alertas enviados a responsáveis ou bloqueio de contatos. As avaliações não comprovam aliciamento nem garantem segurança.

## Por onde começar

| Parte | O que faz hoje | Como acessar |
|---|---|---|
| **Banca original — 24 testes** | Analisa uma conversa ou um lote de 24 exemplos fictícios, compara com rótulos esperados, permite editar o prompt e exportar resultados em CSV. | [Abrir o site](https://izzaramirez.github.io/cap-ai/) — arquivo `index.html`. |
| **Extensão — versão 0.3.0** | Mostra o popup com a logo, abre uma simulação com três resultados fixos e oferece um link para o laboratório local. A ocultação de mensagem só afeta a simulação. | [Instalação e testes](extension/README.md). Também é possível [abrir apenas a simulação no site](https://izzaramirez.github.io/cap-ai/extension/demo.html), sem instalar a extensão. |
| **Laboratório local com IA** | Envia manualmente um texto fictício à Anthropic após confirmação e mostra uma avaliação experimental, incluindo informações que faltam. | [Instruções do laboratório](lab-ia/README.md). No Windows, iniciar com `INICIAR-IA.cmd`. |

**Seu link salvo continua sendo o da banca original.** O laboratório local é outra interface e exige um servidor executando no seu computador. Publicar seus arquivos no GitHub não inicia esse servidor no GitHub Pages. A extensão abre os testes por links; não coleta conversas para o laboratório.

A banca e o laboratório usam prompts, formatos de resposta e conjuntos de exemplos diferentes. Seus resultados ainda não foram comparados em uma avaliação comum.

## Usar a banca original

1. Abra [a banca no GitHub Pages](https://izzaramirez.github.io/cap-ai/).
2. Para realizar análises, informe sua própria chave da Anthropic no campo indicado. Esta versão guarda a chave no armazenamento local do navegador (`localStorage`) e chama a API diretamente.
3. Escolha um exemplo e clique em **Analisar**, ou use **Rodar as 24** para executar o lote.
4. Confira as respostas, as divergências em relação aos rótulos e, se desejar, baixe o CSV.

Os 24 exemplos têm rótulos de referência definidos no protótipo: 13 “perigo” e 11 “inocente”. O limiar `score >= 51` é usado pela banca para comparar a resposta com esses rótulos; não dispara bloqueios ou avisos externos. Esses exemplos e esse limiar precisam de avaliação crítica e não representam uma validação em conversas reais.

## Usar o laboratório local com IA

1. Baixe o repositório e extraia o ZIP, caso tenha usado **Code / Código → Download ZIP**.
2. Tenha Node.js 22 ou superior disponível. No Windows, abra `INICIAR-IA.cmd` na pasta extraída.
3. Cole a chave da Anthropic no prompt de entrada oculta e pressione Enter.
4. Quando aparecer o endereço `http://127.0.0.1:8765`, abra-o no navegador e mantenha a janela do servidor aberta.
5. Use um texto fictício, marque a confirmação e clique em **Enviar à IA e analisar**.

O endereço `127.0.0.1` se refere ao computador de quem está acessando. Outra pessoa precisa iniciar sua própria instância para usar esse laboratório. [Instruções completas e solução de problemas](lab-ia/README.md).

## Chave, dados e diferenças entre os testes

| Aspecto | Banca original | Laboratório local | Simulação da extensão |
|---|---|---|---|
| Usa IA | Sim, por envio manual | Sim, por envio manual com confirmação | Não; resultados predefinidos |
| Chave de API | Guardada no navegador em `localStorage` | Recebida pelo iniciador e mantida na memória da sessão do servidor | Não utiliza |
| Envio do texto | Navegador → Anthropic | Navegador → servidor local → Anthropic | Não envia |
| Execução em lote e CSV | Disponíveis | Ainda não implementados | Não se aplicam |

As chamadas reais podem consumir créditos da API. Use apenas exemplos inventados, sem dados pessoais, nesta etapa. As condições da conta e do provedor também se aplicam ao texto enviado.

Não publique chaves no código, em commits, capturas ou no diário. Se uma chave for publicada, revogue-a no provedor. O armazenamento de uma chave no navegador pela banca original não equivale a publicá-la no GitHub, mas permite que scripts executados nessa página a acessem. O laboratório local mantém a credencial fora da página e da extensão.

## O que já foi verificado

- **Extensão no Edge:** instalação e popup; três cenários da simulação; ocultação, restauração e reinício. [Registro manual](docs/TESTE-MANUAL-EDGE.md).
- **Laboratório:** oito testes automatizados com provedor simulado e três análises reais executadas pela responsável em 26/09/2026.
- **Resultados reais:** amigos, 5/100; presente condicionado e segredo, 78/100; convite sem contexto, 5/100. [Resultados, evidências e limitações](docs/RESULTADOS-IA-2026-09-26.md).

Essas três análises demonstram o funcionamento da integração nessas execuções. Não medem precisão ou confiabilidade geral. Foi registrada uma explicação que extrapolou a evidência ao mencionar “insistência”; a correção do prompt e sua reavaliação continuam pendentes.

## Próximas etapas

1. Executar o [roteiro de seis novos casos](docs/ROTEIRO-IA-NOVOS-CASOS.md) e registrar divergências, incluindo falsos alarmes, sinais não identificados e conclusões sem evidência.
2. Corrigir e versionar o prompt a partir dos resultados, preservando os registros anteriores.
3. Definir uma avaliação comum para a banca e o laboratório, com exemplos e critérios revisados, antes de unificar suas funcionalidades.
4. Estudar a integração da extensão com plataformas específicas, suas permissões e o tratamento de dados.
5. Projetar avisos e possíveis ações de proteção, com revisão humana e avaliação própria antes de qualquer uso real.

A visão futura contempla captura autorizada, análise contextual e ações de proteção. A captura em outras plataformas, o envio de alertas a responsáveis, o bloqueio de contatos, um bot de Discord e uma API/SDK para terceiros são possibilidades de desenvolvimento; não estão implementados. O uso com crianças exige avaliação específica de eficácia, privacidade, consentimento e requisitos legais.

## Histórico e organização

- [Diário de desenvolvimento](docs/DIARIO-DE-DESENVOLVIMENTO.md): estado anterior, mudanças, motivos, verificações e pendências.
- [Código da banca original](index.html).
- [Extensão](extension/) e [laboratório local](lab-ia/).
- [PR #3](https://github.com/IzzaRamirez/cap-ai/pull/3): integração da extensão, do laboratório e dos registros à branch `main`.

Os registros antigos descrevem o estado na data de cada etapa. O diário é atualizado manualmente a cada entrega.
