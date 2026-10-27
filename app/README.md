# Estoque+ — Gestão de Estoque Comercial

## Problema identificado
Pequenos comércios podem perder mercadorias e dinheiro devido à falta de organização do estoque, ao vencimento de produtos e à dificuldade de acompanhar quantidades disponíveis.

## Contexto, público e justificativa
O projeto é voltado a pequenos mercados, mercearias e minimercados. Um controle organizado permite identificar itens com estoque baixo e produtos próximos do vencimento, apoiando decisões de reposição e reduzindo perdas.

## Proposta de solução
Aplicativo mobile **Estoque+** para registrar produtos, acompanhar quantidade e validade, e apresentar alertas de estoque baixo e vencimento.

## Tipos de usuário e permissões planejadas
- **Gerente:** consultar, cadastrar, editar e excluir produtos; gerenciar funcionários.
- **Funcionário:** consultar produtos, atualizar quantidades e visualizar alertas; sem permissão para excluir produtos ou gerenciar usuários.

As permissões serão aplicadas **no backend**, com JWT, na Entrega 3. Nesta primeira versão não existe autenticação nem controle real de acesso.

## Funcionalidades previstas
- Listagem de produtos, com nome, quantidade e validade.
- Cadastro, consulta, edição e exclusão (CRUD).
- Alertas de validade próxima e estoque baixo.
- Cadastro e login de usuários com senha protegida por hash.
- JWT, Bearer Token, logout, rotas protegidas e permissões por nível.

## Telas previstas
- **Entrega 1:** Início, Produtos, Alertas, Sobre.
- **Entregas futuras:** Login, Cadastro de usuário, Cadastro/Edição de produto, Gestão de funcionários.

## Fluxo inicial de navegação
Início → Produtos / Alertas / Sobre → voltar à tela anterior.

## Estrutura
- `App.js`: configuração do React Navigation.
- `screens/`: telas do aplicativo.
- `components/`: componentes e cores compartilhadas.
- `services/`: reservado para comunicação com a API na Entrega 2.
- `database/`: reservado para scripts SQL na Entrega 2.

## Entrega 1 — Estado atual
- Expo criado e React Navigation configurado.
- Quatro telas navegáveis.
- Identidade visual inicial.
- Produtos e alertas **demonstrativos, fixos no código**.
- Sem MySQL, API, login ou CRUD nesta etapa.

## Como executar
```bash
npm install
npx expo start
```
Pressionar `w` para abrir a versão web, após instalar as dependências de web com `npx expo install react-dom react-native-web @expo/metro-runtime`.

## Próximas entregas
1. **Entrega 2:** modelagem MySQL, API REST com Express, conexão via `fetch()`, primeiras operações.
2. **Entrega 3:** CRUD completo, cadastro/login, hash, JWT, Bearer Token, níveis, permissões e rotas protegidas.
3. **Entrega 4:** testes, documentação final, build APK e apresentação.

## Cuidados com o repositório
Nunca publicar `.env`, senhas, JWT_SECRET, tokens ou `node_modules`. Manter README, código e scripts versionados com commits e push em cada entrega.
