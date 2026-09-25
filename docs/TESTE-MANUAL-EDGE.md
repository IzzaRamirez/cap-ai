# Testes manuais — CAP AI 0.1.0 e 0.2.0 no Microsoft Edge

Data do relato: 24/09/2026. Execução: responsável pelo projeto, com orientação nesta tarefa. Evidências: capturas de tela fornecidas na conversa; imagens não copiadas para o repositório porque incluem conteúdo de outras páginas.

## Resultado observado

- A extensão foi carregada sem pacote e apareceu como CAP AI 0.1.0, ativada.
- O popup abriu pelo botão da extensão na barra do navegador.
- Logo, identificação da versão e textos de privacidade estavam visíveis e legíveis nas capturas.
- A responsável fechou e reabriu o popup e confirmou que apareceu igual; uma segunda captura documentou a reabertura.

Resultado: instalação, abertura e reabertura do painel informativo verificadas manualmente no Edge. A versão exata do navegador não foi informada. Não houve inspeção de console ou tráfego de rede.

## Dificuldades de navegação

As primeiras instruções mencionavam o Chrome, mas a responsável estava usando o Edge, cujo botão observado era “Carregar sem pacote”. Uma tentativa posterior abriu a página de atalhos de teclado; a orientação foi ajustada para usar o menu de extensões da barra do navegador.

## Limites

O teste não valida detecção de grooming nem bloqueio de mensagens: esses recursos não existem na versão 0.1.0. O teste no Google Chrome continua pendente. O sucesso visual no Edge não equivale a uma avaliação do motor de análise.

## Demonstração 0.2.0 — sequência confirmada em 24/09/2026

Executada pela responsável, com orientação passo a passo e inspeção das imagens pelo assistente. Todos os resultados são predefinidos. O registro atesta apenas os estados visíveis e o relato da responsável.

| Teste | Resultado | Captura fornecida na conversa |
|---|---|---|
| Popup atualizado | Versão 0.2.0 e link do chat visíveis. | `codex-clipboard-21d254cd-8ab6-4da3-b5ad-3087c2855fcb.png` |
| Amigos | Resultado sem alerta programado; sem ocultação. | `codex-clipboard-3abd10b8-f2bf-4a84-a7af-e3b3e1ad4ba7.png` |
| Desconhecido | Alerta programado e ação de ocultação visíveis. | `codex-clipboard-bb3768f4-d48b-4535-9d34-3fb89df578b8.png` |
| Contexto insuficiente | Resultado de incerteza, sem ocultação. | `codex-clipboard-acf3c397-84d3-4edb-985e-ff80b2daec02.png` |
| Ocultação | Última mensagem substituída pelo aviso; demais preservadas. | `codex-clipboard-81588f64-e585-48a8-ab59-6bbe2fc15f91.png` |
| Restauração | Texto original reaparece; botão oferece ocultação novamente. | `codex-clipboard-7df3d21f-81e4-48b7-b53f-40452def1e93.png` |
| Reinício | Três mensagens visíveis, resultado limpo, ação de ocultação removida. | `codex-clipboard-9fbf5e2b-1b8e-4339-ac5c-a0ac1bee253d.png` |

Os nomes identificam evidências da conversa, não arquivos publicados neste repositório. Não há comprovação de testes em Chrome, em telas pequenas, por teclado, com recarga da página ou em outro computador. A versão exata do Edge não foi coletada. Nenhuma conversa real foi enviada a IA; a demonstração não possui essa integração.
