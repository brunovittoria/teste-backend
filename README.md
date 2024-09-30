# Projeto de API - Cadastro de Usuários

## Descrição

Este projeto é uma API para o cadastro de usuários, desenvolvida utilizando **Node.js** e **Express**, com integração ao banco de dados MySQL. A API possui validações como verificação de duplicidade de e-mail e CPF, além de garantir que os termos de uso sejam aceitos.

## Tecnologias Utilizadas

- **Node.js**
- **Express**
- **MySQL**
- **Sequelize**
- **Postman**

## Funcionalidades

- Cadastro de novos usuários
- Validação de e-mails e CPF duplicados
- Aceite obrigatório dos termos de uso
- Validação de formato de campos (e-mail, CPF, etc.)
- Middleware de tratamento de erros

## Instalação

Siga os passos abaixo para configurar o ambiente do projeto localmente.

### Pré-requisitos

- **Node.js** (versão 14.x ou superior)
- **MySQL** (ou outro banco de dados relacional)
- **Postman** (para testes da API)

### Passo a Passo

1. **Clone o repositório:**

2. **Instale as dependências:**

   Na raiz do projeto, execute o comando:

   ```bash
   npm install
   ```

   Ou

   ```bash
   yarn install
   ```

3. **Rodando as Migrações (Se aplicável):**

   Rode as migrações para preparar o banco de dados:

   ```bash
   npx sequelize-cli db:migrate
   ```

4. **Iniciando o servidor:**

   Para iniciar o servidor, execute o comando:

   ```bash
   yarn dev
   ```

   O servidor estará rodando em `http://localhost:4568`.

## Endpoints da API

### POST `/user/register`

Cadastra um novo usuário.

**Body (JSON):**

```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "confirmEmail": "joao@example.com",
  "permissions": "user",
  "cpf": "12345678900",
  "cep": "12345678",
  "logradouro": "Rua Exemplo",
  "numero": "123",
  "cidade": "São Paulo",
  "bairro": "Centro",
  "estado": "SP",
  "termsAccepted": true
}
```

**Respostas Esperadas:**

- **201 Created**: Usuário cadastrado com sucesso.
- **400 Bad Request**: Erro de validação (e-mails diferentes, CPF inválido, etc.).
- **409 Conflict**: E-mail ou CPF já registrados.

### Exemplo de Erro

```json
{
  "message": "Email already registered"
}
```

## Testes no Postman

### 1. **Criar Usuário (POST `/user/register`)**

- **URL:** `http://localhost:4568/user/register`
- **Método:** `POST`
- **Body:** JSON com as informações do usuário a ser cadastrado.
- **Headers:** Content-Type: `application/json`

### 2. **Erros de Validação**

- **E-mails Diferentes:**

  - Tente cadastrar um usuário com e-mails divergentes nos campos `email` e `confirmEmail`.

- **Termos Não Aceitos:**

  - Tente cadastrar um usuário com `termsAccepted` como `false`.

- **E-mail ou CPF Duplicado:**
  - Tente cadastrar um usuário com um e-mail ou CPF já registrado anteriormente.

### 3. **Verificação de Rotas Inexistentes**

Tente acessar uma rota inexistente para garantir que o middleware de erro 404 está funcionando corretamente.

- **Exemplo:** `GET /user/nonexistent`

**Resposta Esperada:**

```json
{
  "message": "Resource not found"
}
```

## Estrutura de Pastas

```bash
src/
 ├── app.ts               # Configuração do Express e middlewares
 ├── index.ts             # Ponto de entrada da aplicação
 ├── middlewares/         # Middlewares personalizados
 ├── modules/
 │    └── user/           # Módulo de cadastro de usuários
 │         ├── router.ts  # Rotas de usuário
 │         └── controller.ts  # Lógica de criação de usuário
 ├── router.ts            # Arquivo de roteamento principal
 └── errors/              # Tratamento de erros personalizados
.env                      # Arquivo de configuração de variáveis de ambiente
```
