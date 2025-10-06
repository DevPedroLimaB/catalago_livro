# 📚 Catálogo de Livros - Tutorial Completo

Olá! Vou te ensinar como funciona este **Sistema de Gerenciamento de Livros Pessoais**. É uma aplicação completa onde você pode criar sua conta, fazer login e gerenciar sua biblioteca pessoal de livros.

## 🎯 O que este aplicativo faz?

Este é um **sistema completo** que permite:

✅ **Criar sua conta** - Cada pessoa tem seu próprio espaço  
✅ **Fazer login seguro** - Suas informações ficam protegidas  
✅ **Adicionar livros** - Cadastre os livros que você possui ou quer ler  
✅ **Editar informações** - Mude detalhes dos seus livros quando quiser  
✅ **Remover livros** - Delete livros que não quer mais na lista  
✅ **Ver apenas seus livros** - Cada usuário vê somente sua própria biblioteca  

## 🏗️ Como foi construído (Tecnologias)

Eu usei as tecnologias mais modernas do mercado:

**🖥️ Backend (Servidor):**
- **Node.js + Express.js** - Para criar a API que gerencia tudo
- **MongoDB + Mongoose** - Banco de dados para guardar usuários e livros
- **JWT (JSON Web Tokens)** - Sistema de login seguro
- **bcryptjs** - Para criptografar senhas

**🎨 Frontend (Interface):**
- **React + Vite** - Interface moderna e rápida
- **Tailwind CSS** - Design bonito e responsivo
- **React Router** - Navegação entre páginas
- **Axios** - Comunicação com o servidor

## 🚀 Como colocar para funcionar

Vou te ensinar passo a passo como rodar na sua máquina:

### Passo 1: Preparar o Servidor (Backend)

Primeiro, vamos configurar o "cérebro" da aplicação:

1. **Abra o PowerShell** e navegue até a pasta do servidor:
```powershell
cd server
```

2. **Crie o arquivo de configuração** copiando o modelo:
```powershell
copy .env.example .env
```

3. **Edite o arquivo `.env`** com suas informações:
```
MONGO_URI=sua_conexao_mongodb_aqui
JWT_SECRET=uma_senha_super_secreta_aqui
PORT=5000
```
> 💡 **Dica:** Use o MongoDB Atlas (gratuito) para o banco de dados

4. **Instale as dependências** (bibliotecas necessárias):
```powershell
npm install
```

5. **Inicie o servidor:**
```powershell
npm run dev
```

✅ **Pronto!** O servidor estará rodando em http://localhost:5000

### Passo 2: Preparar a Interface (Frontend)

Agora vamos configurar a parte visual:

1. **Abra outro PowerShell** e vá para a pasta do cliente:
```powershell
cd client
```

2. **Instale as dependências:**
```powershell
npm install
```

3. **Inicie a aplicação:**
```powershell
npm run dev
```

✅ **Pronto!** A aplicação estará disponível em http://localhost:5174

### 🎮 Forma Mais Fácil (Scripts Automáticos)

Criei scripts para facilitar sua vida:

1. **Clique duplo** em `start-backend.bat` (inicia o servidor)
2. **Clique duplo** em `start-frontend.bat` (inicia a interface)

## 📱 Como usar o aplicativo

### 1️⃣ **Primeira vez - Criar sua conta**

1. Acesse http://localhost:5174
2. Clique em **"Registre-se"**
3. Escolha um **username** e **senha**
4. Clique em **"Cadastrar"**

### 2️⃣ **Entrar no sistema**

1. Na tela de login, digite seu **username** e **senha**
2. Clique em **"Entrar"**
3. Você será levado para sua biblioteca pessoal

### 3️⃣ **Gerenciar seus livros**

**➕ Adicionar um livro:**
- Clique no botão **"Adicionar Livro"**
- Preencha: **Título**, **Autor**, **Ano de Publicação** (opcional)
- Clique em **"Salvar"**

**✏️ Editar um livro:**
- Na lista, clique no botão **"Editar"** ao lado do livro
- Modifique as informações
- Clique em **"Salvar"**

**🗑️ Remover um livro:**
- Clique no botão **"Excluir"** ao lado do livro
- Confirme a exclusão

**👀 Navegar pelos livros:**
- Use os botões **"Anterior"** e **"Próxima"** para ver mais livros
- Cada página mostra 10 livros

### 4️⃣ **Sair do sistema**

- Clique no botão **"Logout"** no canto superior direito

## 🔒 Segurança

O sistema é **muito seguro**:
- Senhas são **criptografadas** (ninguém consegue ver, nem eu!)
- Cada usuário vê **apenas seus próprios livros**
- **Tokens de autenticação** expiram automaticamente
- **Logout automático** se a sessão expirar

## 🛠️ API - Para desenvolvedores

Se você é programador, aqui estão os endpoints:

### Autenticação
- `POST /api/auth/register` - Criar conta
- `POST /api/auth/login` - Fazer login

### Gerenciamento de Livros
- `POST /api/books` - Adicionar novo livro
- `GET /api/books` - Listar seus livros (com paginação)
- `GET /api/books/:id` - Ver detalhes de um livro
- `PUT /api/books/:id` - Editar um livro
- `DELETE /api/books/:id` - Remover um livro

> 🔐 **Importante:** Todas as rotas de livros precisam do token de autenticação

## 📂 Estrutura do Projeto

```
📁 catalago_livro/
├── 📁 server/          # Backend (API)
│   ├── 📁 config/      # Configuração do banco
│   ├── 📁 controllers/ # Lógica de negócio
│   ├── 📁 models/      # Modelos do banco de dados
│   ├── 📁 routes/      # Rotas da API
│   ├── 📁 middleware/  # Autenticação
│   └── 📄 index.js     # Arquivo principal
│
├── 📁 client/          # Frontend (Interface)
│   ├── 📁 src/
│   │   ├── 📁 components/  # Componentes reutilizáveis
│   │   ├── 📁 pages/       # Páginas da aplicação
│   │   ├── 📄 App.jsx      # Componente principal
│   │   └── 📄 api.js       # Cliente HTTP
│   └── 📄 index.html
│
├── 📄 start-backend.bat   # Script para iniciar servidor
├── 📄 start-frontend.bat  # Script para iniciar interface
└── 📄 README.md           # Este arquivo
```

## ❓ Resolução de Problemas

**🔴 "Não consigo criar conta"**
- Verifique se o servidor está rodando (http://localhost:5000)
- Confirme se o MongoDB está configurado corretamente

**🔴 "Página não carrega"**
- Certifique-se que ambos os serviços estão rodando
- Backend: http://localhost:5000
- Frontend: http://localhost:5174

**🔴 "Não consigo adicionar livros"**
- Verifique se você está logado
- Confirme se o token não expirou (faça login novamente)

**🔴 "Esqueci minha senha"**
- Atualmente, você precisa criar uma nova conta
- Em futuras versões, adicionarei recuperação de senha

## 🎓 Aprendizado

Este projeto demonstra conceitos importantes:

- **Autenticação JWT** - Login seguro
- **CRUD Completo** - Criar, Ler, Atualizar, Deletar
- **Separação Frontend/Backend** - Arquitetura moderna
- **Banco de Dados NoSQL** - MongoDB
- **Interface Responsiva** - Funciona em celular e desktop
- **Proteção de Rotas** - Segurança por usuário

## 🚀 Próximas Melhorias

- 📧 Recuperação de senha por email
- 📸 Upload de capas de livros
- 🔍 Sistema de busca avançada
- 📊 Estatísticas de leitura
- 🏷️ Categorias e tags
- 📱 Aplicativo mobile

---

**👨‍💻 Desenvolvido por:** DevPedroLimaB, luancavalcanti7, DevAntonioFreires

**📅 Data:** Outubro 2025

**💡 Dúvidas?** Abra uma issue no GitHub!
