require('dotenv').config();

const express = require('express');
const cors = require('cors');

const produtosRoutes = require('./routes/produtosRoutes');
const authRoutes = require('./routes/authRoutes');

if (!process.env.JWT_SECRET ||
    process.env.JWT_SECRET.length < 32) {
  console.error('Configure uma JWT_SECRET segura no .env.');
  process.exit(1);
}

const app = express();

app.use(cors());
app.use(express.json({ limit: '100kb' }));

app.get('/', (req, res) => {
  res.json({
    mensagem: 'API Estoque+ funcionando!',
    versao: 'Entrega 3'
  });
});

app.use('/auth', authRoutes);
app.use('/produtos', produtosRoutes);

app.use((erro, req, res, next) => {
  console.error(erro);

  return res.status(400).json({
    erro: 'Requisição inválida.'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API Estoque+ rodando na porta ${PORT}`);
});