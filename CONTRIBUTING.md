# Como contribuir

## Git flow

Usamos um fluxo simples baseado em `main` + branches de feature.

- `main` está sempre pronto pra produção. Nunca commite direto nele.
- Cada task vira **um** branch e **um** PR.

### Nome do branch

`<tipo>/<descricao-curta-em-kebab-case>`

Tipos: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`.

```
feat/frete-gratis
fix/cupom-abaixo-do-minimo
refactor/extrai-calculo-frete
```

### Começando uma task

```bash
git switch main
git pull
git switch -c feat/frete-gratis
```

## Commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>: <resumo no imperativo, minúsculo, sem ponto final>

<corpo opcional: o PORQUÊ da mudança, não o o quê>
```

Exemplos bons:

```
feat: aplica frete gratis acima de R$150
fix: compara subtotal com minimo do cupom antes do frete
test: cobre cupom expirado no limite do vencimento
```

Regras:

- Imperativo: "adiciona", não "adicionado"/"adicionando".
- Um commit = uma ideia. Não misture refactor com feature.
- O resumo explica a mudança; o corpo explica a decisão quando não é óbvia.

## Antes de abrir o PR

Rode tudo que o CI vai rodar — assim você não descobre erro depois:

```bash
npm run lint
npm run typecheck
npm test
```

Comportamento novo **precisa de teste**. Bug corrigido **precisa de um teste que
falharia antes do fix**.

## Pull Request

- Título no mesmo padrão do commit: `feat: frete gratis acima de R$150`.
- Preencha o template (o que mudou, por quê, como testar).
- Mantenha o PR pequeno e focado numa task.
- O CI precisa estar verde.
- Responda aos comentários do review: ajuste o código, commite e empurre no
  mesmo branch — o PR atualiza sozinho. Não abra outro PR.

## Review — o que esperar

O tech lead vai comentar linha a linha. Pode:

- pedir mudança (`request changes`) — resolva antes do merge;
- sugerir melhoria sem travar;
- aprovar (`approve`).

Crítica ao código não é crítica a você. É assim que o time mantém qualidade e é
assim que você aprende rápido.
