const express = require('express');

const router = express.Router();

const {
  autenticar,
  permitir
} = require('../middlewares/auth');

const {
  listarProdutos,
  cadastrarProduto,
  editarProduto,
  atualizarQuantidade,
  excluirProduto
} = require('../controllers/produtosController');

// Todas as operações exigem login.
router.use(autenticar);

// Gerente e funcionário podem consultar.
router.get(
  '/',
  permitir('gerente', 'funcionario'),
  listarProdutos
);

// Somente gerente pode cadastrar.
router.post(
  '/',
  permitir('gerente'),
  cadastrarProduto
);

// Gerente pode editar todos os campos.
router.put(
  '/:id',
  permitir('gerente'),
  editarProduto
);

// Ambos podem atualizar somente a quantidade.
router.patch(
  '/:id/quantidade',
  permitir('gerente', 'funcionario'),
  atualizarQuantidade
);

// Somente gerente pode excluir.
router.delete(
  '/:id',
  permitir('gerente'),
  excluirProduto
);

module.exports = router;