# CAP AI — extensão Chrome

Esqueleto Manifest V3, versão 0.1.0. O único recurso é um popup informativo em português.

## Instalar localmente

1. Abra `chrome://extensions` no Chrome.
2. Ative o **Modo do desenvolvedor**.
3. Clique em **Carregar sem compactação** e selecione esta pasta `extension/`.
4. Abra a CAP AI pelo menu de extensões para ver o popup.

## Arquivos

- `manifest.json`: identificação da extensão e configuração do popup.
- `popup.html`: conteúdo informativo e acessível.
- `popup.css`: estilos locais, sem fontes ou recursos externos.
- `assets/logo.png`: logo fornecida, exibida no topo do popup; arquivo original preservado.

## Escopo e privacidade

Não há JavaScript, service worker, content scripts, permissões, permissões de host, armazenamento, analytics ou chamadas de rede. A extensão não lê páginas, não acessa conversas e não envia dados. Não há monitoramento nesta versão.

## Verificação manual

Após carregar a pasta, confirme que o Chrome não indica erros e que o popup mostra as informações de privacidade. Feche e reabra o popup para verificar sua exibição. Para remover a extensão de teste, use **Remover** em `chrome://extensions`.

## Aplicação ao repositório

Copie esta pasta para `extension/` na raiz de `IzzaRamirez/cap-ai`. Todos os arquivos são novos; nenhum arquivo existente deve ser substituído. Revise as alterações antes de criar um commit ou enviá-las ao GitHub.
