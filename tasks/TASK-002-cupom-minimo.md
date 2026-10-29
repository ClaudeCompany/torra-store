# TASK-002 — Cupom recusado no valor exato do mínimo

**Tipo:** bug fix
**Prioridade:** alta
**Branch sugerido:** `fix/cupom-minimo-inclusivo`

## Bug reportado

O suporte recebeu reclamações: clientes com o carrinho **exatamente no valor
mínimo** de um cupom recebem "Subtotal abaixo do mínimo exigido pelo cupom" e o
desconto não aplica.

Reprodução relatada:

> Cupom `PRIMEIRA20` exige subtotal mínimo de R$100,00. Cliente com carrinho de
> **R$100,00 cravados** tenta aplicar e leva a recusa `BELOW_MINIMUM`.

O esperado: R$100,00 **atinge** o mínimo, então o cupom deve valer.

## Comportamento esperado

O `minSubtotal` é o valor **a partir do qual** o cupom vale — limite **inclusivo**:

| Subtotal vs. mínimo | Resultado       |
| ------------------- | --------------- |
| subtotal > mínimo   | cupom vale      |
| subtotal = mínimo   | **cupom vale**  |
| subtotal < mínimo   | `BELOW_MINIMUM` |

(Mesma lógica inclusiva do frete grátis da TASK-001.)

## Como atacar

1. Escreva **primeiro** um teste que reproduz o bug: subtotal **igual** ao
   `minSubtotal` deve resultar em cupom válido. Rode e veja ele **falhar** — é
   assim que você confirma que pegou o bug certo.
2. Só então corrija o código. O teste passa a verde.
3. A suíte atual continua passando (o fix não pode quebrar nada).

## Definition of done

- [ ] Teste que **falharia antes do fix**, cobrindo subtotal = mínimo.
- [ ] Bug corrigido: subtotal igual ao mínimo aceita o cupom.
- [ ] Testes de "acima" e "abaixo" do mínimo continuam corretos.
- [ ] `docs/business-rules.md` deixa explícito que o mínimo é inclusivo.
- [ ] `npm run lint`, `npm run typecheck` e `npm test` verdes.
- [ ] PR aberto seguindo o template, referenciando esta task.

## Fora de escopo

Não mexa em outras regras de cupom (percentual, fixo, expiração, inativo) nem no
frete. PR pequeno, focado no mínimo.
