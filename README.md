# trabalho-final-tees

Repositório para trabalho final da disciplina de Tópicos Especiais em Engenharia de Software.

## Tecnologias

- [Next.js 16](https://nextjs.org/) com App Router
- [React 19](https://react.dev/) + TypeScript
- [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## Pré-requisitos

- [Node.js](https://nodejs.org/) 22+
- [Docker](https://www.docker.com/) (opcional, para rodar via container)

## Instalação

```bash
npm install
```

## Como executar

### Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

### Produção (local)

```bash
npm run build
npm start
```

### Docker

```bash
docker compose up --build
```

Acesse [http://localhost:3000](http://localhost:3000).

## Padrão de commits

Este projeto usa [Conventional Commits](https://www.conventionalcommits.org/). O Husky valida a mensagem automaticamente ao fazer `git commit`.

```
<tipo>(escopo opcional): <descrição>
```

Tipos permitidos: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.
