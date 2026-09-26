# Primeira rodada real de testes com IA — 26/09/2026

Execução manual pela responsável, em laboratório local. Evidência: três capturas fornecidas na conversa. Horários abaixo são os exibidos pela interface, no contexto de Brasília. Modelo reportado: `claude-sonnet-5`. Prompt: `capai-lab-1`. Extensão: 0.3.0. Sem monitoramento de outros sites ou bloqueio de contatos.

O servidor recebeu a chave pelo prompt oculto e as três chamadas retornaram avaliações utilizáveis. A chave e as capturas não foram incluídas neste repositório. Os textos são fictícios. As explicações abaixo são resumos da saída visível, não cópias integrais das respostas da API.

| Caso | Horário | Score | Contexto insuficiente | Observação |
|---|---|---:|---|---|
| Amigos combinando um jogo | 19:37:52 | 5/100 | Não | Reconheceu colegas, consulta à mãe e respeito à decisão. |
| Presente condicionado e segredo | 19:39:22 | 78/100 | Sim | Identificou oferta condicionada, ida ao privado e segredo dos pais. |
| Contexto insuficiente | 19:42:42 | 5/100 | Sim | Não listou sinais preocupantes e explicitou lacunas do contexto. |

Esses scores são escalas experimentais, não probabilidades. São três observações, uma por caso; não permitem estimar precisão, recall, falsos alarmes ou confiabilidade em uso real. Os exemplos já orientaram o desenvolvimento da interface; não constituem um conjunto independente de avaliação.

## IA-01 — Amigos combinando um jogo

```text
A: Sou o João da sua turma. Vamos jogar depois da aula?
B: Vou perguntar para minha mãe primeiro.
A: Tudo bem, combinamos depois.
```

Expectativa qualitativa: poucos sinais de risco no trecho, sem garantia de segurança. Resultado compatível com essa expectativa. A IA também observou que não havia confirmação das identidades, idades ou histórico. Mesmo com contexto marcado como suficiente, listou informações ausentes; essa distinção merece atenção em novas avaliações.

Evidência: `codex-clipboard-0381af0b-bbd0-4268-9bc7-790fca05c8da.png`, enviada na conversa.

## IA-02 — Presente condicionado e segredo

```text
A: Posso te dar um item raro.
B: Mas eu não te conheço.
A: Só se vier conversar em privado e não contar aos seus pais.
```

Expectativa qualitativa: apontar a combinação preocupante de oferta condicionada, privado e segredo, sem declarar intenção criminosa como fato. A resposta identificou esses elementos e reconheceu falta de informações sobre os participantes.

**Problema observado:** a explicação usou “insistência em privado”, mas há apenas uma exigência explícita de conversa privada no trecho. É possível descrever condição e desconfiança; repetição ou insistência não estão claramente demonstradas. Registrar como extrapolação da explicação, sem inventar uma falha de classificação estatística. O prompt permanece `capai-lab-1` nesta publicação; a melhoria ainda não foi aplicada ou retestada.

Evidência: `codex-clipboard-474e3b63-d049-4a4f-99bf-db88595edad9.png`.

## IA-03 — Convite sem contexto suficiente

```text
A: Quer entrar no nosso grupo para jogar?
B: Quem está no grupo?
```

Expectativa qualitativa: reconhecer ambiguidade e não concluir aliciamento a partir de um convite isolado. A resposta foi compatível: nenhum sinal listado, contexto insuficiente e explicação das informações ausentes (relação, idade, plataforma, histórico e continuação).

Evidência: `codex-clipboard-feee67d9-df85-4ae0-961c-9fa95849f3a0.png`.

## Limites e pendências

- O texto “A chave será validada na primeira análise” continua na tela após sucesso; é uma mensagem inicial que ainda precisa ser atualizada dinamicamente. As respostas recebidas demonstram sucesso nessas chamadas, não acesso permanente ou saldo futuro.
- Não houve captura de tráfego, medição de latência, custo ou exportação do JSON bruto. O assistente não executou essas chamadas nem recebeu a chave.
- Nenhuma mensagem foi bloqueada. A integração apenas retornou uma avaliação para revisão.
- Corrigir e versionar instruções sobre evidências e insistência; repetir casos com identificação explícita da nova versão, preservando estes resultados.
- Executar o [próximo roteiro](ROTEIRO-IA-NOVOS-CASOS.md), ainda pendente, com autorização por chamada.
