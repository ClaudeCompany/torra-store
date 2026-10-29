# Regras de negócio

Fonte da verdade do comportamento esperado. Quando o código e este documento
divergirem, é bug num dos dois — alinhe antes de implementar.

## Dinheiro

- Todo valor monetário é **inteiro em centavos**. Nunca `float`. R$ 32,00 é
  `3200`. Conversão pra Real só na exibição (`formatBRL`).
- Nenhum total pode ficar negativo. Desconto é limitado ao subtotal.

## Peso

- Peso é **inteiro em gramas**, por variante (`weightGram`). Usado só no frete.

## Catálogo

- Um **produto** (ex: "Bourbon Amarelo") tem uma ou mais **variantes** (250g,
  500g, 1kg), cada uma com preço e estoque próprios.
- Produto com `active = false` não aparece na loja.
- Variante com `stock = 0` aparece como esgotada e não pode ser comprada.

## Cupom

Tipos:

- `PERCENT`: `value` é a porcentagem (ex: `10` = 10%). Desconto arredonda **pra
  baixo** (`Math.floor`).
- `FIXED`: `value` é o desconto em centavos.

Um cupom é inválido quando:

| Situação                   | Motivo (`CouponError`) |
| -------------------------- | ---------------------- |
| `active = false`           | `INACTIVE`             |
| `expiresAt` já passou      | `EXPIRED`              |
| subtotal `<` `minSubtotal` | `BELOW_MINIMUM`        |

Detalhes:

- A comparação de mínimo é contra o **subtotal** (antes de frete e desconto).
- No instante exato do `expiresAt` o cupom **ainda vale** (`now > expiresAt`
  para expirar, não `>=`).
- Desconto nunca passa do subtotal.

## Frete

Calculado por **zona** (prefixo do CEP) + **peso total** do carrinho.

| Primeiro dígito do CEP | Zona         | Base | Por kg extra |
| ---------------------- | ------------ | ---- | ------------ |
| 0, 1, 2, 3             | SUDESTE      | R$15 | R$5          |
| 8, 9                   | SUL          | R$20 | R$6          |
| 4, 5                   | NORDESTE     | R$25 | R$8          |
| 6, 7                   | NORTE_CENTRO | R$30 | R$10         |

- O **primeiro quilo está incluso na base**. Cada quilo **iniciado** além do
  primeiro soma o valor "por kg" (1001g já conta como 2kg).
- CEP é validado: 8 dígitos (com ou sem máscara). Inválido → erro, não calcula.
- **Frete grátis** quando o subtotal (antes de cupom) é **≥ R$150,00** (`15000`
  centavos). Limite inclusivo: R$150,00 exato já tem frete grátis.

## Total do pedido

```
total = subtotal − desconto + frete
```

Onde `subtotal = Σ (preço da variante × quantidade)`.
