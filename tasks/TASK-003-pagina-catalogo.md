# TASK-003 — Página de catálogo + corrigir navegação

**Tipo:** feature
**Prioridade:** alta
**Branch sugerido:** `feat/pagina-catalogo`

## Contexto

Hoje não existe uma página que liste **todos os cafés**. As rotas são só `/`
(home), `/carrinho` e `/produto/[slug]`. Por isso vários "ver os cafés" apontam
pra `/` e não levam a lugar nenhum útil (levantado pelo Felipe na revisão de UX).

## Critério de aceite

1. Nova rota **`/cafes`** que lista **todos os produtos ativos** (`active = true`),
   reusando o componente `ProductCard`. Mesma fonte/critério da home: ordenar por
   `createdAt` asc e trazer as variantes (`weightGram` asc). Ver a query em
   `src/app/page.tsx`.
2. Corrigir os 3 links que hoje vão pra `/`, apontando pra `/cafes`:
   - menu "Cafés" (`src/components/Header.tsx`);
   - breadcrumb "Cafés" na página de produto (`src/app/produto/[slug]/page.tsx`);
   - "Todos os cafés" no footer (`src/components/Footer.tsx`).
3. Produto inativo **não** aparece no catálogo; variante com `stock = 0` segue
   exibida como esgotada (comportamento atual do card, não regredir).

## Escopo / onde mora o quê

- A regra de "esgotado" hoje está **inline** no `ProductCard.tsx`
  (`variants.every((v) => v.stock <= 0)`), sem teste. **Extraia** para uma função
  pura em `src/lib` (ex.: `src/lib/catalog.ts`, `isSoldOut(product)`), e faça o
  card **usar** essa função. É a fatia testável desta task.
- A página em si (busca no banco + layout) não precisa de teste de unidade — regra
  pura é que precisa. Mantém a lógica no `src/lib`, a página fina.

## Definition of done

- [ ] Rota `/cafes` lista os produtos ativos, reusando `ProductCard`.
- [ ] Os 3 links (menu, breadcrumb, footer) apontam pra `/cafes`.
- [ ] `isSoldOut` extraída pra `src/lib` e usada pelo `ProductCard`.
- [ ] Teste de unidade da `isSoldOut`: alguma variante com estoque → **não**
      esgotado; todas com `stock = 0` → esgotado.
- [ ] `npm run lint`, `npm run typecheck` e `npm test` verdes.
- [ ] PR aberto seguindo o template, referenciando esta task.

## Fora de escopo

- Seção "Sobre" / âncora `#sobre` (vira outra task).
- Melhorias do carrinho (CEP no localStorage, cotação obsoleta, stepper) — tasks à parte.
- Não mexer em preço, cupom, frete nem no layout além do necessário pra listar.
