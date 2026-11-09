# Estoque+ — Gestão Inteligente de Estoque Comercial

## 1. Apresentação

O Estoque+ é um aplicativo de gerenciamento de estoque voltado para pequenos estabelecimentos comerciais, como mercados, mercearias e minimercados.

O sistema busca auxiliar na organização de mercadorias, no acompanhamento das quantidades disponíveis e no controle das datas de validade, contribuindo para reduzir desperdícios e prejuízos.

## 2. Problema identificado

Pequenos estabelecimentos comerciais podem enfrentar dificuldades para controlar seus produtos, especialmente quando utilizam anotações manuais ou métodos pouco organizados.

A falta de acompanhamento pode resultar em produtos vencidos, mercadorias em quantidade insuficiente e perdas financeiras.

## 3. Objetivo

Desenvolver um aplicativo que permita consultar e gerenciar produtos, acompanhar quantidades e identificar mercadorias que necessitam de atenção.

## 4. Público-alvo

Pequenos comerciantes, gerentes de estabelecimentos e funcionários responsáveis pela organização de estoques.

## 5. Requisitos funcionais

**RF01:** O sistema deverá permitir consultar produtos cadastrados.

**RF02:** O sistema deverá permitir cadastrar novos produtos.

**RF03:** O sistema deverá apresentar nome, categoria, quantidade, unidade e validade dos produtos.

**RF04:** O sistema deverá identificar produtos próximos do vencimento ou vencidos.

**RF05:** O sistema deverá identificar produtos com quantidade igual ou inferior ao estoque mínimo.

**RF06:** O sistema deverá permitir editar produtos em uma etapa posterior.

**RF07:** O sistema deverá permitir excluir produtos em uma etapa posterior.

**RF08:** O sistema deverá permitir cadastro e login de usuários em uma etapa posterior.

**RF09:** O sistema deverá possuir níveis de acesso de gerente e funcionário.

## 6. Telas do aplicativo

### Início
Apresenta o objetivo do aplicativo e os atalhos para as principais funcionalidades.

### Produtos
Permite consultar os produtos cadastrados no banco de dados e cadastrar novas mercadorias.

### Alertas
Apresenta os produtos que estão próximos do vencimento, vencidos ou com estoque baixo.

### Sobre
Apresenta o problema, a proposta de solução, o público-alvo e os níveis de usuário previstos.

A navegação ocorre por uma barra inferior com quatro opções.

## 7. Tecnologias utilizadas

- React Native;
- Expo;
- React Navigation;
- JavaScript;
- Node.js;
- Express;
- MySQL;
- mysql2;
- API REST;
- fetch().

## 8. Arquitetura

O aplicativo utiliza uma arquitetura cliente-servidor.

O React Native apresenta as informações e realiza requisições HTTP utilizando fetch().

A API Express recebe as requisições, executa as operações necessárias e consulta o banco de dados MySQL.

Fluxo:

React Native → fetch() → API Express → MySQL

## 9. Modelagem do banco de dados

**Banco:** estoque_mais

### Entidade: produtos

| Campo | Tipo | Descrição |
|---|---|---|
| id | INT | Identificador do produto |
| nome | VARCHAR(150) | Nome do produto |
| categoria | VARCHAR(80) | Categoria |
| quantidade | INT | Quantidade disponível |
| unidade | VARCHAR(20) | Unidade de medida |
| validade | DATE | Data de validade |
| quantidade_minima | INT | Quantidade mínima desejada |
| criado_em | TIMESTAMP | Data de cadastro |

### Entidade: usuarios

| Campo | Tipo | Descrição |
|---|---|---|
| id | INT | Identificador do usuário |
| nome | VARCHAR(120) | Nome |
| email | VARCHAR(150) | E-mail |
| senha_hash | VARCHAR(255) | Senha protegida |
| perfil | ENUM | Gerente ou funcionário |
| criado_em | TIMESTAMP | Data de cadastro |

A tabela de usuários foi preparada para a Entrega 3. Nesta etapa, ainda não existe autenticação.

## 10. Principais rotas da API

| Método | Rota | Função |
|---|---|---|
| GET | / | Verificar funcionamento da API |
| GET | /produtos | Listar produtos |
| POST | /produtos | Cadastrar produto |
| PUT | /produtos/:id | Planejada para a Entrega 3 |
| DELETE | /produtos/:id | Planejada para a Entrega 3 |

As rotas PUT e DELETE ainda não foram implementadas.

## 11. Níveis de usuário previstos

### Gerente

Poderá cadastrar, consultar, editar e excluir produtos, além de gerenciar funcionários.

### Funcionário

Poderá consultar produtos, atualizar quantidades e visualizar alertas.

O controle de permissões será implementado no backend durante a Entrega 3.

## 12. Funcionalidades da Entrega 2

Nesta etapa foram desenvolvidas:

- Modelagem do banco de dados;
- Criação das tabelas produtos e usuarios;
- Estrutura inicial da API Express;
- Conexão com MySQL;
- Rota GET para consultar produtos;
- Rota POST para cadastrar produtos;
- Integração do aplicativo com a API utilizando fetch();
- Listagem de produtos reais;
- Formulário de cadastro;
- Alertas calculados a partir dos produtos cadastrados.

## 13. Como executar

### Banco de dados

Abrir o MySQL Workbench e executar o arquivo `database/estoque_mais.sql`.

### Backend

Na pasta `backend`, executar:

`npm install`

Criar o arquivo `.env` com as configurações locais do MySQL.

Depois executar:

`node server.js`

A API utilizará a porta 3000.

### Aplicativo

Na pasta `app`, executar:

`npm install`

Depois:

`npx expo start`

Pressionar `w` para abrir no navegador.

Para testar em um celular físico, será necessário configurar o endereço IP do computador no arquivo `app/services/api.js`.

## 14. Próximas etapas

Na Entrega 3 serão desenvolvidos:

- Edição de produtos;
- Exclusão de produtos;
- Cadastro de usuários;
- Login;
- Proteção de senhas;
- Autenticação JWT;
- Controle de permissões;
- Rotas protegidas.

Na Entrega 4 serão realizados os testes finais, a documentação e a geração do APK.

## Entrega 3 — Autenticação, JWT, permissões e CRUD

### Objetivo

A terceira etapa do Estoque+ implementa autenticação de usuários, gerenciamento de sessão, controle de acesso e operações completas de gerenciamento de produtos.

### Funcionalidades implementadas

- Cadastro inicial de gerente;
- Cadastro de funcionários por gerentes autenticados;
- Proteção de senhas com bcrypt;
- Login com validação de e-mail e senha;
- Geração de JWT;
- Armazenamento local da sessão;
- Envio de Bearer Token nas requisições;
- Validação de JWT no backend;
- Logout;
- Perfis de gerente e funcionário;
- Middleware de autenticação e autorização;
- CRUD completo de produtos;
- Atualização de quantidades;
- Integração React Native, Express e MySQL.

### Níveis de acesso

**Gerente:** consulta, cadastra, edita e exclui produtos, atualiza quantidades, visualiza alertas e cadastra funcionários.

**Funcionário:** consulta produtos, atualiza quantidades e visualiza alertas. Não pode cadastrar, editar completamente ou excluir produtos.

### Rotas de autenticação

| Método | Rota | Acesso |
|---|---|---|
| POST | /auth/primeiro-gerente | Público, apenas enquanto não houver usuários |
| POST | /auth/login | Público |
| GET | /auth/perfil | Autenticado |
| POST | /auth/funcionarios | Gerente |

### Rotas de produtos

| Método | Rota | Acesso |
|---|---|---|
| GET | /produtos | Gerente e funcionário |
| POST | /produtos | Gerente |
| PUT | /produtos/:id | Gerente |
| PATCH | /produtos/:id/quantidade | Gerente e funcionário |
| DELETE | /produtos/:id | Gerente |

### Segurança

As senhas são armazenadas como hashes bcrypt. A API utiliza JWT para identificar usuários autenticados, e as rotas protegidas exigem o cabeçalho Authorization com Bearer Token.

As permissões são verificadas no backend. O aplicativo mantém a sessão localmente e permite logout.

### Execução

1. Iniciar o servidor MySQL e garantir que o banco `estoque_mais` esteja criado.
2. Na pasta `backend`, executar `npm install`.
3. Configurar o arquivo `.env` com a conexão MySQL e a chave JWT.
4. Executar `node server.js`.
5. Na pasta `app`, executar `npm install` e `npx expo start`.
6. Abrir o aplicativo, cadastrar o primeiro gerente e realizar login.

### Testes previstos

- Cadastro de gerente;
- Cadastro de funcionário;
- Verificação do hash de senha;
- Login com credenciais válidas e inválidas;
- Acesso a rotas com e sem JWT;
- Verificação de permissões de gerente e funcionário;
- Cadastro, consulta, edição e exclusão de produtos;
- Atualização de quantidades;
- Persistência dos dados no MySQL;
- Restauração da sessão e logout.

### Próxima etapa

Na Entrega 4 serão realizados os ajustes finais, os testes de apresentação, a revisão da documentação e a geração do APK.