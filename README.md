# ☕ Torra — loja online

Monorepo da **Torra**, e-commerce de café torrado artesanal. Vendemos grãos
com torra sob demanda e enviamos pro Brasil inteiro. Este repositório é a loja:
catálogo, carrinho e cálculo de pedido (subtotal, cupom, frete).

> **Contexto:** este é um ambiente de treino que simula uma empresa real. Você
> é o dev. As tasks chegam em `tasks/`, você abre PR, e o tech lead revisa.
> Se é seu primeiro dia, **comece por [`ONBOARDING.md`](./ONBOARDING.md).**

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Prisma** + **SQLite** (banco local, sem Docker)
- **Tailwind CSS**
- **Vitest** (testes de unidade) + **Playwright** (e2e)
- **ESLint** + **Prettier** + **Husky** (hook de pre-commit)
- **GitHub Actions** (lint + typecheck + testes em todo PR)

## Rodando local

Pré-requisito: Node 20+.

```bash
npm install
cp .env.example .env     # DATABASE_URL do SQLite
npm run db:reset         # cria o banco e popula com dados de exemplo
npm run dev              # http://localhost:3000
```

## Scripts

| Comando             | O que faz                              |
| ------------------- | -------------------------------------- |
| `npm run dev`       | Sobe o app em modo desenvolvimento     |
| `npm test`          | Roda os testes de unidade (Vitest)     |
| `npm run test:e2e`  | Roda os testes end-to-end (Playwright) |
| `npm run lint`      | ESLint                                 |
| `npm run typecheck` | TypeScript sem emitir                  |
| `npm run format`    | Formata tudo com Prettier              |
| `npm run db:reset`  | Recria o banco e roda o seed           |
| `npm run db:seed`   | Só popula o banco                      |

## Mapa do código

```
src/
├── app/            # rotas (App Router): home, produto, carrinho, api/quote
├── components/     # componentes React (carrinho client-side, header)
└── lib/            # regra de negócio pura (cart, coupon, shipping, pricing)
prisma/
├── schema.prisma   # modelo de dados
└── seed.ts         # dados de exemplo
tests/              # testes de unidade da regra de negócio
docs/               # regras de negócio e arquitetura
tasks/              # backlog: suas tarefas chegam aqui
```

A regra de negócio vive em `src/lib` como **funções puras** (sem banco, sem
React), por isso é fácil de testar. Valores monetários são **sempre em
centavos** (inteiro) — ver [`docs/business-rules.md`](./docs/business-rules.md).

## Documentos

- [`ONBOARDING.md`](./ONBOARDING.md) — primeiro dia, do zero
- [`CONTRIBUTING.md`](./CONTRIBUTING.md) — git flow, branch, commit, PR
- [`docs/business-rules.md`](./docs/business-rules.md) — as regras do negócio
- [`docs/architecture.md`](./docs/architecture.md) — por que o código é assim
