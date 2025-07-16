# Atividade Prática – Gestão de Cardápio de Restaurante Delivery

## Objetivo

Desenvolver um sistema web para gestão de cardápio de restaurante delivery, utilizando **Express.js**, **Sequelize**, **PostgreSQL**, autenticação **JWT** e boas práticas de organização de código em JavaScript.

Você irá praticar:
- Modelagem de dados com relacionamento
- Autenticação e autorização
- CRUD completo
- Validações

---

## Funcionalidades Obrigatórias

### Usuários
- Cadastro, autenticação (JWT) e consulta de perfil
- Apenas admin pode criar/editar/excluir pratos
- Clientes podem ver o cardápio e fazer pedidos

### Cardápio / Pratos
- Cadastro e gerenciamento de pratos
- Cada prato: nome, descrição, preço, categoria, disponível (boolean)
- Visualização pública do cardápio

### Pedidos
- CRUD completo de pedidos
- Cada pedido pertence a um usuário e contém um ou mais pratos
- Usuário pode criar e visualizar seus pedidos
- Admin pode visualizar todos os pedidos

---

## Tecnologias

- [Express.js](https://expressjs.com/)
- [Sequelize](https://sequelize.org/) (PostgreSQL)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [express-validator](https://express-validator.github.io/)
- [dotenv](https://www.npmjs.com/package/dotenv)

---

## Estrutura de Diretórios

```
2024.10.115-UC8
│
├── node_modules
├── src
│   ├── config
│   │   └── configDB.js
│   ├── middleware
│   │   ├── autenticacao.middleware.js
│   │   └── autorizacao.middleware.js
│   ├── modulos
│   │   ├── usuario
│   │   │   ├── controllers
│   │   │   │   └── usuario.controller.js
│   │   │   ├── models
│   │   │   │   └── usuario.model.js
│   │   │   └── routes
│   │   │       └── usuario.route.js
│   │   ├── cardapio
│   │   │   ├── controllers
│   │   │   │   └── cardapio.controller.js
│   │   │   ├── models
│   │   │   │   └── prato.model.js
│   │   │   └── routes
│   │   │       └── cardapio.route.js
│   │   └── pedido
│   │       ├── controllers
│   │       │   └── pedido.controller.js
│   │       ├── models
│   │       │   └── pedido.model.js
│   │       └── routes
│   │           └── pedido.route.js
├── .env
├── .env.example
├── .gitignore
├── index.js
├── package.json
└── README.md
```

---

## Modelos e Relacionamentos

### Usuário
- `nome`
- `email` (único)
- `senha` (hash)
- `role` (admin, cliente)

### Prato/Cardápio
- `prato_nome`
- `descricao`
- `preco`
- `categoria` (entrada, prato principal, sobremesa)
- `disponivel` (boolean)

### Pedido
- `usuarioId` (FK)
- `pratos` (relacionamento N:N)
- `data_pedido` (Date)
- `total` (float)

---

## Rotas Obrigatórias

### Usuário

| Método | Rota             | Descrição            | Autenticação |
|--------|------------------|----------------------|--------------|
| POST   | /usuarios        | Cadastro usuário     | Não          |
| POST   | /usuarios/login  | Login (JWT)          | Não          |
| GET    | /usuarios/me     | Perfil do usuário    | Sim (JWT)    |

### Cardápio / Pratos

| Método | Rota             | Descrição            | Autenticação | Permissão     |
|--------|------------------|----------------------|--------------|--------------|
| GET    | /cardapio        | Listar cardápio      | Não          | Pública      |
| GET    | /cardapio/:id    | Detalhe do prato     | Não          | Pública      |
| POST   | /cardapio        | Criar prato          | Sim (JWT)    | Apenas admin |
| PUT    | /cardapio/:id    | Atualizar prato      | Sim (JWT)    | Apenas admin |
| DELETE | /cardapio/:id    | Excluir prato        | Sim (JWT)    | Apenas admin |

### Pedidos

| Método | Rota             | Descrição                | Autenticação | Permissão                |
|--------|------------------|--------------------------|--------------|--------------------------|
| GET    | /pedidos         | Listar pedidos           | Sim (JWT)    | Admin vê todos, cliente só os seus |
| GET    | /pedidos/:id     | Detalhes do pedido       | Sim (JWT)    | Dono ou admin            |
| POST   | /pedidos         | Fazer pedido             | Sim (JWT)    | Apenas cliente           |
| PUT    | /pedidos/:id     | Atualizar pedido         | Sim (JWT)    | Dono do pedido           |
| DELETE | /pedidos/:id     | Cancelar pedido          | Sim (JWT)    | Dono do pedido           |

---

## Validações Obrigatórias

- E-mail único para usuário
- Senha: mínimo 6 caracteres, obrigatoriamente criptografada
- Nenhum campo obrigatório pode ser nulo/vazio
- Só admin pode cadastrar, editar ou excluir prato
- Usuário só pode visualizar/fazer/cancelar seus próprios pedidos
- Pedidos devem conter pelo menos 1 prato
- Não permitir pedidos com pratos indisponíveis

---

## Exemplo de `.env.example`

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=delivery
DB_USER=postgres
DB_PASSWORD=sua_senha
JWT_SECRET=umsegredoseguro
```

---

## Critérios de Avaliação

- Estrutura de pastas exatamente como descrita
- Models e relacionamentos corretos
- Controllers finos (regras em services)
- Validações, autenticação e autorização funcionando
- Senhas criptografadas
- Middlewares aplicados corretamente
- Projeto funcionando de ponta a ponta
- Código limpo, padronizado e comentado

---

## Fontes Oficiais

- [Express.js](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [express-validator](https://express-validator.github.io/)
- [dotenv](https://www.npmjs.com/package/dotenv)

---

## Nome do Repositório

```
2024.10.115-UC8-delivery-cardapio-pedidos
```
