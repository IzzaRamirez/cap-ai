# Laboratório CAP AI com Anthropic

Atualização de 26/09/2026: a responsável concluiu três análises reais. Veja [resultados e limitações](../docs/RESULTADOS-IA-2026-09-26.md) e o [próximo roteiro, ainda não executado](../docs/ROTEIRO-IA-NOVOS-CASOS.md). O relato de testes simulados abaixo corresponde à verificação anterior às chamadas reais.

Protótipo local, sem bibliotecas adicionais. Requer Node.js 22 ou superior. Não é um detector validado e não bloqueia conversas. A demonstração 0.2.0 com respostas fixas continua disponível separadamente.

## Iniciar no Windows

1. Na pasta `cap-ai-review`, abra `INICIAR-IA.cmd` com dois cliques.
2. A janela pede sua chave da Anthropic com entrada oculta. Cole a chave e pressione Enter. Não digite a chave como comando, não a envie no chat nem a coloque em arquivos versionados.
3. Aguarde aparecer `CAP AI: http://127.0.0.1:8765`.
4. Abra `http://127.0.0.1:8765` no Edge e mantenha a janela do iniciador aberta.
5. Escolha um exemplo ou escreva uma conversa fictícia. Confirme a caixa de autorização e clique em **Enviar à IA e analisar**.
6. Leia a pontuação experimental, os sinais, a explicação e os limites de contexto. Um resultado baixo não garante segurança. Nenhum contato é bloqueado.
7. Para encerrar, pressione Ctrl+C na janela do servidor ou feche-a.

O iniciador usa Node disponível no PATH ou o runtime local do Codex. A opção ExecutionPolicy do comando vale apenas para esse processo PowerShell; não altera a política persistente do computador. Se uma política corporativa impedir sua execução, não a altere: peça suporte ao administrador.

O link do popup 0.3.0 apenas abre o laboratório local; ele não inicia o servidor. Recarregue a extensão em `edge://extensions` para ver esse link, ou abra o endereço local diretamente. Se a porta estiver ocupada, encerre a outra instância do laboratório antes de tentar novamente.

## Chave e dados

- Chave recebida por prompt oculto e transmitida ao processo Node por variável de ambiente; sem gravação pelo projeto em arquivo, URL, HTML ou armazenamento do navegador. Permanece em memória durante a sessão e é enviada somente como credencial ao endpoint fixo da Anthropic.
- Texto enviado somente por clique e confirmação. A API pode consumir créditos mesmo em respostas incompletas. Não há repetição automática.
- Conversas e respostas não são gravadas pelo servidor e não aparecem nos logs. Permanecem transitoriamente na página e no processamento em memória. A política de dados do provedor e as condições da conta também se aplicam; esta implementação não promete retenção zero pela Anthropic.
- Somente loopback `127.0.0.1`, porta 8765. Não expor na internet ou rede local. Host, origem, token de sessão e tipo de conteúdo são validados; sem CORS aberto. Esses controles não protegem contra software malicioso já executando no computador.
- Limite de 6000 caracteres, 2000 tokens de saída, intervalo de três segundos, uma análise por vez e prazo de 60 segundos para a API. Configuração sem chave não permite análise.
- Arquivos públicos servidos por lista explícita; scripts do servidor e credenciais não são servidos. Texto da IA é exibido como texto, não HTML.

## Modelo e formato

Modelo padrão: `claude-sonnet-5`, conforme documentação consultada em 26/09/2026. Pode ser configurado por `CAPAI_MODEL` no ambiente do servidor, sem alterar o código. O acesso real depende da conta. O prompt experimental é identificado por `capai-lab-1` e está em `server.mjs`.

Usa Messages API com `output_config.format` e JSON Schema. A resposta passa por validação local adicional de tipo, tamanho e score. Recusa, limite de tokens, JSON inválido e erros da API aparecem como falha de análise, nunca como resultado seguro.

Fontes consultadas: [modelos](https://platform.claude.com/docs/en/models/overview) e [saídas estruturadas](https://platform.claude.com/docs/en/build-with-claude/structured-outputs).

## Verificação e próximos testes

Execute, na raiz do projeto: `node --test lab-ia/server.test.mjs`.

Em 26/09/2026: oito testes automatizados passaram com provedor simulado, sem chave real e sem consumo da API. Cobrem consentimento, entrada, sessão, origem, host, acesso a arquivos, erros, saída inválida, timeout, concorrência e intervalo. Sintaxe do JavaScript e do iniciador PowerShell verificada. Navegador interno: tela sem chave, seleção de exemplo e limpeza conferidas. O iniciador interativo com chave real e o fluxo completo com Anthropic ainda precisam de teste pelo usuário.

Roteiro para a primeira rodada: analisar os três exemplos e uma variação fictícia de cada um. Registrar modelo, versão do prompt, data, resultado esperado, resposta obtida e discordâncias. Não interpretar três casos como validação estatística. Resultados podem variar entre chamadas. Não usar dados reais de crianças nesta etapa.
