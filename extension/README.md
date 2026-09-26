# CAP AI — extensão 0.3.0

Atualização: o popup também oferece um link para o [laboratório com IA](../lab-ia/README.md). Execute `INICIAR-IA.cmd` na raiz do projeto antes de abrir esse link. O laboratório envia à Anthropic somente o texto confirmado pelo usuário e usa a chave no servidor local. A simulação abaixo continua sem rede e com respostas fixas. Nenhuma permissão foi adicionada ao manifesto. A extensão não captura conversas de outros sites.

Popup informativo e chat fictício com três resultados predefinidos. Esta demonstração não usa IA nem detecta grooming.

## Atualizar e testar

1. Em edge://extensions, clique em Recarregar no cartão CAP AI. No Chrome, use chrome://extensions. Confira a versão 0.3.0.
2. Abra o popup e clique em Abrir chat de demonstração.
3. Selecione o exemplo de amigos e mostre o resultado: não há ação de ocultação.
4. Selecione o exemplo de desconhecido. Mostre o resultado e o alerta predefinido; o botão de ocultar deve substituir somente a última mensagem. Clique novamente para restaurá-la.
5. Selecione o convite sem contexto: o resultado deve indicar contexto insuficiente, sem ocultação.
6. Reiniciar, mudar de exemplo ou recarregar a página deve limpar o resultado e restaurar as mensagens.

Para primeira instalação, ative o modo do desenvolvedor e selecione esta pasta usando Carregar sem pacote (Edge) ou Carregar sem compactação (Chrome).

## Escopo

Os novos arquivos demo.html, demo.css e demo.js implementam a simulação local. O script não lê outros sites, não envia mensagens nem acessa APIs. Não há permissões, content scripts, service worker ou armazenamento. A ocultação só afeta a página de demonstração e não bloqueia contatos reais.

A logo original é preservada em assets/logo.png. A banca de análise na raiz continua separada. A instalação e a reabertura da versão 0.1.0 foram testadas manualmente no Edge. Na versão 0.2.0, foram verificados visualmente os três exemplos, a ocultação, a restauração e o reinício. Veja o [registro dos testes](../docs/TESTE-MANUAL-EDGE.md). O Chrome continua pendente.
