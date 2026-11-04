const express = require('express');

const router = express.Router();

const {
  listarProdutos,
  cadastrarProduto
} = require('../controllers/produtosController');

router.get('/', listarProdutos);

router.post('/', cadastrarProduto);

module.exports = router;