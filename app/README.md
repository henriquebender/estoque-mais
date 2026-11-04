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