# Arquitetura — por quê, não só o quê

## Regra de negócio isolada em `src/lib`

As funções de cálculo (`cart`, `coupon`, `shipping`, `pricing`) são **puras**:
recebem dados, devolvem dados, sem tocar em banco, rede ou React. Motivos:

- **Testável sem infra.** Os testes em `tests/` rodam em milissegundos, sem
  subir banco nem servidor.
- **Reaproveitável.** A mesma função calcula no servidor (API) e poderia
  calcular no cliente, sem duplicar regra.
- **Fácil de revisar.** A regra do negócio fica num lugar só, legível.

A fronteira é: banco e HTTP ficam em `app/` e `lib/db.ts`; **decisão** de
negócio fica nas funções puras.

## Preço vem do servidor, nunca do cliente

O carrinho no navegador guarda nome/preço só pra exibir. Mas o cálculo oficial
(`/api/quote`) **recarrega preço e peso do banco** pelo `variantId`. Se o
cálculo confiasse no preço vindo do cliente, dava pra forjar o preço no
navegador. Regra: cliente manda **o que quer** (id + quantidade), servidor
decide **quanto custa**.

## Dinheiro em centavos

Ver [`business-rules.md`](./business-rules.md). `float` acumula erro de
arredondamento em dinheiro; inteiro em centavos não.

## Erros de domínio explícitos

- Cupom inválido não lança exceção: retorna um `Result` (`ok: false` + motivo).
  É um caminho esperado do fluxo, não uma falha.
- CEP inválido **lança** `InvalidCepError`: é entrada malformada, não um estado
  de negócio. A API traduz pra HTTP 400.

Regra geral: estado de negócio previsível → valor de retorno; entrada
impossível → exceção.
