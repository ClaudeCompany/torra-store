# TASK-001 — Frete grátis acima de R$150

**Tipo:** feature
**Prioridade:** média
**Branch sugerido:** `feat/frete-gratis`

## Contexto

Marketing quer incentivar carrinho maior. A regra combinada com o time:

> Pedidos com **subtotal igual ou maior que R$150** ganham **frete grátis**.

Hoje o frete é sempre cobrado (ver `src/lib/shipping.ts` e `src/lib/pricing.ts`).

## Critério de aceite

1. Subtotal **≥ R$150,00** (`15000` centavos) → `shippingCents = 0` na cotação.
2. Subtotal **< R$150,00** → frete segue o cálculo atual por zona/peso.
3. O limite conta o **subtotal** (antes de desconto de cupom), não o total.
4. Exatamente R$150,00 **já** tem frete grátis (limite inclusivo).
5. Na página do carrinho, quando o frete for grátis, mostrar "Frete grátis" no
   lugar do valor.

## Escopo

- Decida **onde** a regra mora. Dica: `shipping.ts` só conhece peso e CEP; quem
  conhece o subtotal é `pricing.ts`. Pense em qual camada é responsável por isso.
- Atualize `docs/business-rules.md` (hoje lista isso como pendente).

## Definition of done

- [ ] Regra implementada conforme os critérios acima.
- [ ] Teste de unidade cobrindo: acima, abaixo e **exatamente** no limite.
- [ ] `docs/business-rules.md` atualizado (sai de "pendente").
- [ ] Carrinho exibe "Frete grátis" quando aplicável.
- [ ] `npm run lint`, `npm run typecheck` e `npm test` verdes.
- [ ] PR aberto seguindo o template, referenciando esta task.

## Fora de escopo

Não mexa em cupom, estoque nem layout além do texto do frete. Mantenha o PR
pequeno.
