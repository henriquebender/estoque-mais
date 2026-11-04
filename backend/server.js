require('dotenv').config();

const express = require('express');
const cors = require('cors');

const produtosRoutes = require('./routes/produtosRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Rota inicial para testar o servidor
app.get('/', (req, res) => {
  res.json({
    mensagem: 'API Estoque+ funcionando!'
  });
});

// Rotas dos produtos
app.use('/produtos', produtosRoutes);

// Tratamento de JSON inválido
app.use((erro, req, res, next) => {
  console.error(erro);

  res.status(400).json({
    erro: 'Requisição inválida.'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API Estoque+ rodando na porta ${PORT}`);
});