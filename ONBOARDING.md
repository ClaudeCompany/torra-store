# Onboarding — primeiro dia na Torra

Bem-vindo. Este guia assume que você **nunca usou git num time** e vem de um
fluxo tipo "subir pasta por FTP". Sem problema — a ideia é exatamente te tirar
daí. Leia na ordem.

## 1. A mentalidade que muda

No FTP você edita e sobe o arquivo, e pronto — está no ar. Aqui é diferente, e
de propósito:

- **Ninguém altera o código principal direto.** O branch `main` é sagrado: é o
  que vai pra produção. Você trabalha numa cópia (um _branch_).
- **Toda mudança passa por revisão (PR).** Você propõe, o tech lead revisa,
  comenta, você ajusta, e só então entra no `main`.
- **O código é testado automaticamente.** Se um teste quebra, o PR trava. Isso
  te protege de subir algo quebrado.

Parece mais lento. No começo é. Depois vira rede de segurança: dá pra mexer sem
medo de derrubar o site.

## 2. Preparando a máquina

```bash
git clone <url-do-repo>
cd torra-store
npm install
cp .env.example .env
npm run db:reset
npm run dev
```

Abra http://localhost:3000. Se viu os cafés, está pronto.

## 3. Glossário rápido

| Termo      | O que é                                                              |
| ---------- | -------------------------------------------------------------------- |
| **branch** | uma linha de trabalho isolada. Você cria uma por tarefa.             |
| **commit** | um "save" com descrição. Agrupa mudanças relacionadas.               |
| **push**   | manda seus commits pro GitHub.                                       |
| **PR**     | _Pull Request_: pedido pra juntar seu branch no `main`, com revisão. |
| **CI**     | robô que roda lint + testes no seu PR automaticamente.               |
| **review** | comentários do tech lead no seu PR, pedindo ajustes ou aprovando.    |

## 4. Seu primeiro ciclo (o que você vai repetir sempre)

1. Pega a task em [`tasks/`](./tasks).
2. Cria um branch: `git switch -c feat/frete-gratis` (ver [`CONTRIBUTING.md`](./CONTRIBUTING.md)).
3. Escreve o código **e o teste**.
4. Roda local: `npm test` e `npm run lint` — tem que passar antes de subir.
5. Commita: `git commit -m "feat: frete gratis acima de R$150"`.
6. Sobe: `git push -u origin feat/frete-gratis`.
7. Abre o PR no GitHub (o template te guia).
8. Espera o review. Vai ter comentário — é normal e é bom. Ajusta, commita de
   novo, empurra. O PR atualiza sozinho.
9. Aprovado → merge. Fim do ciclo.

## 5. Erros que todo iniciante comete (e tá tudo bem)

- **Esquecer de criar o branch e commitar no `main`.** Se fez, me avisa, a gente
  conserta junto (`git switch -c`, depois reseta o main).
- **PR gigante.** Quanto menor o PR, mais fácil revisar. Uma task = um PR.
- **Subir sem rodar o teste.** O CI vai pegar, mas melhor pegar antes, local.
- **Commit com mensagem "ajustes".** A mensagem conta _o quê_ e _por quê_. Ver
  o padrão no `CONTRIBUTING.md`.

Sua primeira task está em [`tasks/TASK-001-frete-gratis.md`](./tasks/TASK-001-frete-gratis.md).
Qualquer dúvida, comenta no PR ou pergunta. Bom trabalho.
