# Catálogo de Livros

Aplicação full-stack para cadastro e gerenciamento de livros com autenticação de usuários.

## Stack

- Backend: Node.js + Express.js
- Banco: MongoDB + Mongoose
- Autenticação: JWT
- Frontend: React (Vite) + Tailwind CSS

## Como rodar localmente

1) Backend

- Copie o arquivo `server/.env.example` para `server/.env` e preencha:

```
MONGO_URI= # sua conexão MongoDB
JWT_SECRET= # uma chave secreta forte
PORT=5000
```

- Instale dependências e rode o servidor (Windows PowerShell):

```powershell
cd server
npm install
npm run dev
```

O servidor subirá em http://localhost:5000

2) Frontend

- Em outro terminal, instale dependências e rode o app:

```powershell
cd client
npm install
npm run dev
```

O Vite iniciará em http://localhost:5173 e fará proxy das rotas `/api` para o backend.

## Endpoints principais

Auth
- POST `/api/auth/register` { username, password } -> 201 { token, user }
- POST `/api/auth/login` { username, password } -> 200 { token, user }

Livros (todas requerem header `Authorization: Bearer <token>`)
- POST `/api/books` { title, author, publishedYear? } -> 201 Book
- GET `/api/books?page=1&limit=10` -> 200 { items, page, limit, total, pages }
- GET `/api/books/:id` -> 200 Book
- PUT `/api/books/:id` { title?, author?, publishedYear? } -> 200 Book
- DELETE `/api/books/:id` -> 200 { message }

## Estrutura de pastas

- server: API Node/Express, Mongoose, JWT
- client: React + Vite + Tailwind, rotas protegidas e CRUD

## Notas

- Tailwind já está configurado em `client` (postcss, tailwind.config.js, index.css).
- O proxy do Vite (`vite.config.js`) envia `/api` para `http://localhost:5000`.
- O Navbar mostra o username salvo após login/registro e o botão Logout limpa o localStorage.
