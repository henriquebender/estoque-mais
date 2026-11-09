const express = require('express');

const router = express.Router();

const {
  cadastroInicial,
  cadastrarFuncionario,
  login,
  perfil
} = require('../controllers/authController');

const {
  autenticar,
  permitir
} = require('../middlewares/auth');

router.post('/primeiro-gerente', cadastroInicial);

router.post('/login', login);

router.get('/perfil', autenticar, perfil);

router.post(
  '/funcionarios',
  autenticar,
  permitir('gerente'),
  cadastrarFuncionario
);

module.exports = router;