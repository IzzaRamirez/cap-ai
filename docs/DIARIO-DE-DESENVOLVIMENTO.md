# Diário de desenvolvimento — CAP AI

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
