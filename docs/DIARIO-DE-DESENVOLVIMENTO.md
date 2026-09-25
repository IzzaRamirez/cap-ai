# Diário de desenvolvimento — CAP AI

> Atualizado até os testes guiados de 24/09/2026: versões 0.1.0 e 0.2.0 verificadas manualmente no Edge pela responsável, com capturas fornecidas na conversa. Veja [o registro completo dos testes](TESTE-MANUAL-EDGE.md) e a seção 12. Chrome e integração com IA continuam pendentes. As seções 1 a 11 preservam o histórico anterior aos testes.

## Nova etapa — demonstração 0.2.0

Após o pedido de avançar para um chat de teste, foram adicionados demo.html, demo.css e demo.js, com três roteiros fictícios, resultados predefinidos, aviso e ocultação reversível de uma mensagem. Foram atualizados manifesto, popup e README da extensão. O objetivo é testar a interface antes da integração com IA. A demonstração não classifica texto livre nem bloqueia contatos reais.

Agora existe JavaScript exclusivo da página de demonstração; as descrições de ausência de JavaScript abaixo se referem à versão 0.1.0. Não foram adicionados permissões, content scripts, service worker, armazenamento ou chamadas de rede. A banca original segue separada.

Sintaxe de demo.js verificada com node --check. Em seguida, a responsável testou os três exemplos, a ocultação, a restauração e o reinício no Edge. Os resultados estão registrados na seção 12. A demonstração e seus registros integram esta atualização do PR #3, ainda sem merge na main.

A responsável sugeriu testar com outra pessoa. Foi recomendado começar com conversas fictícias entre adultos cientes do teste. Mensagens novas exigem integração do motor e definição do tratamento dos dados; resultados predefinidos não medem capacidade de detecção.

Registro criado em **24/09/2026**. Datas apresentadas no horário de Brasília (America/Sao_Paulo), salvo indicação contrária.

Este diário reúne o histórico disponível no GitHub e o trabalho realizado nesta tarefa em 23–24/09/2026. Não é uma transcrição das conversas nem uma certificação de funcionamento. Distingue código inspecionado, informações das mensagens de commits, ações executadas e testes pendentes.

## 1. Onde acompanhar

- [Repositório](https://github.com/IzzaRamirez/cap-ai)
- [Histórico da main](https://github.com/IzzaRamirez/cap-ai/commits/main)
- [PR #1 — mudanças na banca de testes](https://github.com/IzzaRamirez/cap-ai/pull/1)
- [PR #2 — correção do cabeçalho de acesso](https://github.com/IzzaRamirez/cap-ai/pull/2)
- [PR #3 — extensão com popup e logo](https://github.com/IzzaRamirez/cap-ai/pull/3)
- [Instruções da extensão](../extension/README.md)

**Situação na consulta de 24/09/2026:** o PR #3 estava aberto como rascunho, sem merge. A extensão estava na branch `codex/extension-popup-logo`. A main ainda apontava para `0366a36`. Este diário é acrescentado à mesma branch para revisão junto da entrega.

Uma branch é uma linha de trabalho separada; um commit registra uma versão; um pull request (PR) permite revisar as mudanças antes de incorporá-las à main.

## 2. O que já existia antes desta tarefa

Referência: [estado inicial consultado, commit 0366a36](https://github.com/IzzaRamirez/cap-ai/tree/0366a36fed77750b19a63f5a3bbf802c2507b869).

| Arquivo | Como estava | O que aconteceu nesta tarefa |
|---|---|---|
| `README.md` | Apresentava o projeto, a banca de testes, uso da API, métricas e direção de produto. | Preservado. |
| `index.html` | Continha a banca de testes do motor de análise. | Preservado; não conectado à extensão. |
| `Design sem nome (22).png` | Logo CAP AI, já adicionada na raiz em 23/09. | Preservada; a mesma imagem foi incluída também na pasta da extensão. |
| `extension/` | Não existia. | Criada com cinco arquivos. |
| `docs/DIARIO-DE-DESENVOLVIMENTO.md` | Não existia. | Criado a pedido da responsável pelo projeto. |

### A banca de testes existente

A leitura do `index.html` e do README, feita para elaborar este registro, mostrou:

- Interface em português, usando React e Babel carregados por CDN.
- 24 conversas sintéticas: 13 rotuladas como perigo e 11 como inocentes.
- Campo para chave da Anthropic, guardada no localStorage do navegador.
- Instrução do motor editável na interface.
- Análise individual e execução do lote de 24 conversas.
- Chamada direta à API da Anthropic pelo navegador; o identificador de modelo no código era `claude-sonnet-5`.
- Resposta estruturada com score, nível, padrões, trecho crítico, explicação e ação sugerida.
- Classificação de alerta a partir de score 51.
- Contagem de acertos, perigos não detectados e alarmes falsos.
- Exportação do resultado do lote para CSV e tratamento de alguns erros de API.

Esses pontos descrevem a implementação lida, **não resultados de execução**. Nesta tarefa, não executamos a banca, não enviamos conversas à API e não medimos a qualidade do motor. A disponibilidade do modelo e a compatibilidade atual da API não foram verificadas.

O README anterior descreve objetivos de captura, análise e prevenção. Isso não significa que essas três camadas estejam implementadas na extensão. Afirmações de estratégia e conformidade do README não foram auditadas neste trabalho.

## 3. Histórico anterior recuperado no GitHub

As linhas abaixo foram reconstruídas a partir da lista de commits. Motivos descritos nas mensagens são atribuídos aos registros anteriores, não a testes realizados agora.

| Data (Brasília) | Registro | Mudança e motivo documentados |
|---|---|---|
| 15/06/2026 | [b31df27](https://github.com/IzzaRamirez/cap-ai/commit/b31df276e507893d98c8d34d461dec8617df1514) — Initial commit | Início do histórico versionado consultado. A mensagem não detalha a motivação. |
| 15/06/2026 | [bccc7ff](https://github.com/IzzaRamirez/cap-ai/commit/bccc7ffe758840c6c5d5a15e5237aedf133f402c) — Add files via upload | Upload inicial registrado. A mensagem não detalha os arquivos ou o motivo. |
| 15/06/2026 | [7e9e613](https://github.com/IzzaRamirez/cap-ai/commit/7e9e613adffeff4b2722abeccb0a9d85d1366003), [6a977ec](https://github.com/IzzaRamirez/cap-ai/commit/6a977eca04ac36cbb9807a00d19a7334253f83ce), [fc6272c](https://github.com/IzzaRamirez/cap-ai/commit/fc6272ca1476b02e1c04de4e2c1e3993e73a9cf9), [1dadb52](https://github.com/IzzaRamirez/cap-ai/commit/1dadb52daac87a603399a5c728679c3e5c70cb05) — Update index.html | Quatro atualizações da página. As mensagens são genéricas; os detalhes e motivos não foram reconstruídos. O último commit tem data UTC de 16/06, mas corresponde à noite de 15/06 em Brasília. |
| 12/07/2026 | [fd1a120](https://github.com/IzzaRamirez/cap-ai/commit/fd1a1200eeb42af2c2518ab824d4f0ad0522024b), integrado pelo [PR #1](https://github.com/IzzaRamirez/cap-ai/pull/1) | A mensagem relata remoção de chave de API escrita no código; entrada da chave pela interface; troca de identificador de modelo; saída estruturada; tratamento de erros e novas tentativas; exportação CSV; documentação do projeto. |
| 12/07/2026 | [44fbd35](https://github.com/IzzaRamirez/cap-ai/commit/44fbd35b1200f2a5d2fe25b49bc397f4f6cc4409), integrado pelo [PR #2](https://github.com/IzzaRamirez/cap-ai/pull/2) | A mensagem atribui o erro “Failed to fetch” ao cabeçalho de acesso pelo navegador e registra a correção para `anthropic-dangerous-direct-browser-access`. A correção está presente no código consultado; não foi retestada agora. |
| 10/09/2026 | [17ac9ac](https://github.com/IzzaRamirez/cap-ai/commit/17ac9acf7dcc1bdbabb35333fe3abe75f650dd51) — Update README.md | Atualização da documentação. A mensagem não explica o motivo; não foi feita comparação detalhada dessa revisão. |
| 23/09/2026 | [0366a36](https://github.com/IzzaRamirez/cap-ai/commit/0366a36fed77750b19a63f5a3bbf802c2507b869) — Add files via upload | Inclusão da imagem `Design sem nome (22).png`, confirmada na consulta do commit feita durante a tarefa. |

### Motivos relatados para as mudanças de julho

O registro do PR #1 aponta a exposição de uma chave como motivo para retirar o segredo do código e permitir a entrada pela interface. Também relata atualização de modelo, maior previsibilidade do formato JSON, mensagens de erro mais claras e exportação para facilitar a avaliação.

A revogação da chave antiga **não foi confirmada** nesta tarefa. Nenhum valor de chave é reproduzido neste diário. As justificativas de ciclo de vida de modelos presentes em mensagens antigas não foram verificadas de forma independente.

Os merges de julho aparecem no histórico como [5029305](https://github.com/IzzaRamirez/cap-ai/commit/502930518b3b578f6f5ad79be5803ddcbd9f35c2) e [de9e55a](https://github.com/IzzaRamirez/cap-ai/commit/de9e55ae8b6d31a8415c0d3fbdc9a3c7c459acd5).

## 4. 23/09/2026 — Preparação da extensão

### Pedido e objetivo

Criar uma extensão Chrome Manifest V3 dentro de `extension/`, sem alterar os arquivos existentes. Nesta primeira etapa, mostrar somente um popup informativo: sem ler páginas, acessar conversas ou enviar dados. Apresentar as alterações antes do envio ao GitHub.

### Como foi feito

1. O repositório foi consultado pelo conector GitHub e sua estrutura inicial foi identificada.
2. Como a tarefa local estava aberta em uma pasta de outro projeto, os arquivos foram preparados em uma subpasta separada, `cap-ai-review/extension/`. Não foi criado um clone Git local do repositório.
3. Foram criados manifesto, HTML, CSS e instruções de instalação.
4. A estrutura do manifesto foi conferida e os arquivos foram apresentados para revisão.
5. Nenhum envio ao GitHub foi realizado nessa primeira etapa.

Uma busca inicial de arquivos locais partiu de um diretório inesperado e retornou erros de acesso. As operações seguintes passaram a usar caminhos absolutos. Isso não produziu alterações no repositório.

### Arquivos criados e razões

| Arquivo | Como foi implementado | Por que |
|---|---|---|
| `extension/manifest.json` | Manifest V3, nome CAP AI, versão 0.1.0, título da ação e referência a `popup.html`. | Definir a extensão e o popup que abre pelo menu do Chrome. |
| `extension/popup.html` | Conteúdo estático em português, título, status inicial, avisos de privacidade e limitações. | Explicar com clareza o alcance desta primeira versão. |
| `extension/popup.css` | Estilos locais, fontes do sistema, painel de 340 px, espaçamento e bloco de privacidade. | Dar organização visual sem depender de recursos externos. |
| `extension/README.md` | Instruções para carregar a pasta sem compactação, descrição dos arquivos e verificação manual. | Permitir instalação e revisão reproduzíveis. |

### Decisão de escopo

Não foram adicionados JavaScript, service worker, content scripts, permissões, permissões de host, armazenamento ou integração com APIs. O popup não importa nem executa o `index.html` da banca.

A ausência de rede e armazenamento descrita aqui se refere à **extensão nova**. A banca anterior tem sua própria chamada à API e seu próprio armazenamento local, conforme descrito acima.

## 5. 23/09/2026 — Inclusão da logo

**Pedido:** adicionar a imagem CAP AI fornecida pela responsável pelo projeto.

**Antes:** o popup exibia o nome da extensão em texto, sem imagem.

**Depois:** uma área de marca foi adicionada no topo, acima das informações da versão.

**Como:**

- A imagem recebida foi copiada para `extension/assets/logo.png`.
- Foi incluída uma tag de imagem com texto alternativo “CAP AI — Child Alert Protection”.
- O CSS passou a usar uma área de 118 px de altura, cantos arredondados e enquadramento da imagem com largura de 160% e deslocamento.
- O README da extensão passou a listar o arquivo da logo.

**Por que:** identificar visualmente o projeto e aproveitar a marca fornecida. O enquadramento por CSS reduz o espaço vazio visível ao redor da marca no popup, sem editar os pixels do arquivo.

**Verificações:** a cópia foi comparada com o original por hash. Depois, o hash Git confirmou que a imagem era idêntica à que já existia na raiz do repositório: `e8cedfacf231f0161776accc782108dd2f425982`.

**Limite:** a aparência final no Chrome não foi inspecionada. A imagem não foi configurada como ícone da barra de ferramentas ou ícone da extensão no manifesto; foi adicionada ao conteúdo do popup.

## 6. 23–24/09/2026 — Envio ao GitHub

### Primeira tentativa

Após autorização explícita para enviar, foram lidos os arquivos locais e conferida novamente a referência da main. A criação da árvore de arquivos pela API do GitHub retornou:

> HTTP 403 — Resource not accessible by integration.

A tentativa não criou branch, commit ou PR. Foi verificada a presença de GitHub CLI para uma possível autenticação local, mas a ferramenta não estava instalada.

Inicialmente foi sugerido habilitar escrita; depois a orientação foi corrigida para esclarecer que o erro não comprovava a existência de uma opção de escrita naquela integração. Foram indicados caminhos de configuração do acesso pelo Codex/GitHub.

### Nova tentativa em 24/09

A responsável informou que havia configurado o acesso e pediu nova tentativa. Não foi observado qual ajuste de configuração foi realizado, portanto o diário não atribui a solução a uma permissão específica.

A segunda tentativa funcionou:

1. Conferida a main, ainda em `0366a36`.
2. Relidos os quatro arquivos de texto locais e calculado o hash Git da logo.
3. Criada uma árvore baseada na árvore existente, acrescentando somente `extension/`.
4. Reutilizado o objeto Git da imagem original, pois seu conteúdo era idêntico.
5. Criado o [commit 269b1a1](https://github.com/IzzaRamirez/cap-ai/commit/269b1a1b9d4550d2496ca3aa8d47fc55ebaeaf17).
6. Criada a branch `codex/extension-popup-logo`.
7. Aberto o [PR #3](https://github.com/IzzaRamirez/cap-ai/pull/3) como rascunho e vinculado à tarefa.

O PR foi aberto em **24/09/2026 às 20:11:46 de Brasília** (23:11:46 UTC). Na abertura, continha cinco arquivos novos, 124 linhas adicionadas e nenhuma exclusão; a imagem é binária e não é contabilizada como linhas de texto.

**Por que uma branch e um PR:** manter a entrega disponível no GitHub para revisão antes de incorporá-la à main. Nenhum merge ou publicação na Chrome Web Store foi realizado.

## 7. Antes e depois da entrega

| Aspecto | Antes | Depois, na branch do PR #3 |
|---|---|---|
| Banca de testes | Existente em `index.html`. | Mesmo conteúdo. |
| Documentação principal | README do projeto. | Mesmo conteúdo. |
| Logo original | PNG na raiz. | Mesmo arquivo; cópia idêntica disponível na extensão. |
| Extensão Chrome | Ausente. | Estrutura Manifest V3, versão 0.1.0. |
| Popup | Ausente. | Conteúdo informativo, logo e avisos de privacidade. |
| Análise de conversas na extensão | Ausente. | Continua ausente. |
| Acesso a páginas ou envio de dados pela extensão | Ausente. | Continua ausente. |
| Registro do processo | Histórico de commits e PRs. | Acrescentado este diário explicativo. |

## 8. O que foi verificado e o que falta

| Verificação | Resultado / limite |
|---|---|
| JSON do manifesto | Interpretado com sucesso; `manifest_version` igual a 3. |
| Referência do popup | Arquivo indicado no manifesto encontrado localmente. |
| Campos de acesso | Ausentes `permissions`, `host_permissions`, `content_scripts` e `background`. |
| Logo | Cópia local e objeto Git conferidos por hash. |
| Preservação dos arquivos originais | Árvore da branch consultada; hashes de README, index e logo original iguais aos do estado inicial. |
| Publicação para revisão | Commit e branch criados; PR #3 aberto em rascunho. |
| Instalação no Chrome | Pendente. |
| Aparência, legibilidade e enquadramento da logo no popup | Pendente de inspeção no navegador. |
| Testes da banca de 24 conversas | Não realizados nesta tarefa. |
| Métricas de precisão, recall e alarmes falsos | Nenhum resultado novo produzido. |
| Integração com o motor de IA | Não implementada na extensão. |
| Merge na main e distribuição da extensão | Não realizados. |

## 9. 24/09/2026 — Criação deste diário

**Pedido:** registrar o que já havia, como estava, o que foi alterado, como, por quê e tudo o que foi feito.

**Como:** consulta ao estado do PR #3, à árvore de arquivos, ao histórico de commits, ao README inicial e ao código da banca; reconstrução das ações desta tarefa a partir dos registros da conversa e das ferramentas.

**Resultado:** inclusão deste documento na branch do PR #3. Os arquivos do produto não são alterados por esta etapa de documentação.

**Por que:** manter o contexto junto do código e permitir que a responsável ou outra pessoa entenda as decisões e retome o trabalho.

**Limites do registro:** não temos um diário contemporâneo das primeiras revisões de junho. Não inventamos motivos para commits com mensagens genéricas. A leitura do código não substitui teste em execução. Não foram produzidas capturas de tela ou gravações do popup.

## 10. Próximos passos

- [ ] Carregar `extension/` no Chrome em modo de desenvolvedor.
- [ ] Confirmar que o Chrome não apresenta erros.
- [ ] Abrir, fechar e reabrir o popup; avaliar legibilidade e enquadramento da logo.
- [ ] Registrar data, versão do Chrome, resultado e eventuais capturas desses testes.
- [ ] Revisar o PR #3 e decidir sua integração à main.
- [ ] Definir separadamente o escopo de qualquer futura integração com o motor.
- [ ] Atualizar este diário em cada nova entrega, incluindo falhas e resultados reais.

## 11. Modelo para os próximos registros

### AAAA-MM-DD — Nome da etapa

- **Pedido / objetivo:**
- **Estado anterior:**
- **O que mudou:**
- **Como foi feito e arquivos afetados:**
- **Por que foi feito:**
- **Verificações executadas e resultados:**
- **Falhas, limitações e decisões:**
- **Commit / PR / evidências:**
- **Estado final e pendências:**

A atualização é manual, como parte de cada entrega. Este documento não cria uma automação de registro. Ao corrigir uma informação histórica, identificar a correção e sua fonte; não apresentar planos como trabalho concluído.

## 12. 24/09/2026 — Testes guiados concluídos até aqui

### Objetivo, execução e evidências

A responsável pediu orientação passo a passo para testar a extensão e executou as ações no Microsoft Edge. O assistente orientou e examinou as capturas enviadas na conversa. Não houve controle remoto do navegador pelo assistente. A versão exata do Edge e do sistema operacional não foi coletada.

Os resultados abaixo são verificações manuais da interface, não testes de capacidade de detecção. As imagens permanecem na conversa; não foram publicadas no repositório, pois algumas mostram abas e conteúdo alheios ao projeto. O [registro de teste](TESTE-MANUAL-EDGE.md) identifica as capturas pelos nomes dos arquivos para rastreabilidade, sem depender de caminhos temporários para sua leitura.

### Instalação e popup 0.1.0

1. As instruções iniciais eram para Chrome. A captura revelou que o navegador utilizado era Edge; o nome do botão foi corrigido para **Carregar sem pacote**.
2. A pasta local da extensão foi selecionada. O cartão **CAP AI 0.1.0**, ativado, apareceu na lista.
3. Uma tentativa de abertura levou à página de atalhos de teclado. Foi explicado como usar o botão de extensões da barra do navegador.
4. O popup abriu com logo, versão e informações de privacidade visíveis.
5. A responsável fechou e reabriu o popup; confirmou que apareceu igual e enviou nova captura.

Resultado: instalação, abertura e reabertura verificadas no Edge. Não houve teste de análise ou bloqueio real, pois esses recursos não estavam implementados.

### Da versão 0.1.0 à 0.2.0: o que mudou e por quê

Foi solicitada a próxima etapa do projeto, com uma demonstração de chat. A versão 0.1.0 mostrava apenas o popup. Na 0.2.0, foi incluído um link para uma página local com três roteiros fictícios e resultados predefinidos.

| Arquivo | Alteração | Motivo |
|---|---|---|
| `extension/manifest.json` | Versão 0.2.0 e descrição da demonstração. | Identificar a nova etapa ao recarregar a extensão. |
| `extension/popup.html` | Novo texto, versão e link para o chat em outra aba. | Permitir acesso ao teste e informar que ainda não há IA. |
| `extension/demo.html` | Seletor de exemplos, conversa, resultado, ocultação e reinício. | Demonstrar o fluxo de aviso e ação de interface. |
| `extension/demo.css` | Estilos da página, disposição em colunas e adaptação a telas menores. | Organizar a leitura dos exemplos e resultados. A adaptação a telas menores não foi testada nesta sessão. |
| `extension/demo.js` | Três roteiros, resultados fixos, ocultação reversível e limpeza do estado. | Testar a interação sem enviar dados ou depender de um modelo de IA. |
| `extension/README.md` | Instruções de atualização e roteiro de testes 0.2.0. | Facilitar repetição e esclarecer limites. |
| Documentos em `docs/` | Diário e relatório manual atualizados. | Preservar decisões e resultados observados. |

O JavaScript usa texto predefinido e atua só na página local da extensão. Não foi conectado à banca de testes anterior, a serviços de IA ou a outras plataformas. Os arquivos originais da raiz não foram alterados.

### Resultados da demonstração 0.2.0

| Etapa | Resultado observado nas capturas | Situação |
|---|---|---|
| Atualização | Popup exibiu v0.2.0 e “Abrir chat de demonstração”. | Confirmado |
| Abrir chat | Página do laboratório abriu, com aviso explícito de simulação sem IA. | Confirmado |
| Amigos combinando um jogo | Três mensagens e “Exemplo sem alerta programado”; sem botão de ocultação. | Confirmado |
| Desconhecido oferecendo presente e pedindo segredo | Alerta programado com explicação e botão de ocultar. | Confirmado |
| Convite sem contexto suficiente | Duas mensagens e resultado de contexto insuficiente; sem botão de ocultação. | Confirmado |
| Ocultar mensagem | Só a última mensagem foi substituída por “Mensagem ocultada nesta demonstração.”; as outras duas permaneceram visíveis. | Confirmado |
| Restaurar mensagem | O texto original reapareceu e o botão voltou a oferecer ocultação. | Confirmado |
| Reiniciar exemplo | Três mensagens visíveis, resultado e botão de ocultação ausentes, botão de resultado novamente disponível. | Confirmado visualmente |

A primeira captura solicitada para a ocultação mostrava o exemplo de contexto insuficiente. Ela foi registrada como verificação desse terceiro exemplo; a responsável foi orientada a voltar ao roteiro do desconhecido. A ocultação foi confirmada somente após a captura correspondente. Nenhuma falha de código foi identificada pelas imagens; as dificuldades observadas foram de navegação entre as telas e exemplos.

### Esclarecimentos e decisões registrados

- Foi explicado o aviso de branch principal sem proteção: ausência de regras de proteção não significa que qualquer visitante possa editar o projeto. Não configuramos essas regras.
- Foi explicado que o repositório público pode ser consultado por outras pessoas, mas a extensão não está publicada em loja e não é instalada automaticamente em outros computadores.
- Foi esclarecido que ocultar texto nesta demonstração não bloqueia um contato nem impede mensagens em plataformas reais.
- A responsável sugeriu testar com outra pessoa. A recomendação foi usar conversas fictícias entre adultos cientes do teste, depois da integração do motor. Nenhuma conversa nova entre duas pessoas foi analisada nesta etapa.
- Resultados fixos não medem precisão, recall ou falsos alarmes de IA. Esses indicadores continuam sem validação nesta tarefa.

### Estado ao encerrar este registro

- Concluídos os testes guiados de interface descritos acima no Edge.
- A sintaxe do script havia sido conferida com `node --check`; não foi executada uma suíte automatizada de navegador.
- Não houve inspeção do console ou monitoramento de rede durante os testes manuais.
- Testes no Chrome, acessibilidade por teclado, telas pequenas e recarga da página de demonstração continuam sem validação manual registrada.
- Integração com IA, análise de mensagens livres e bloqueio em serviços reais não foram implementados.
- A versão 0.2.0 e os registros são reunidos no PR #3 para revisão. Não foi feito merge, publicação em loja ou instalação em outro computador.
- Próxima etapa proposta, ainda não executada: definir a integração do motor, o tratamento dos dados e os testes com novas conversas fictícias.
