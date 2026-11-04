const conexao = require('../conexao');

// GET - Consultar todos os produtos
async function listarProdutos(req, res) {
  try {
    const [produtos] = await conexao.query(
      `SELECT
        id,
        nome,
        categoria,
        quantidade,
        unidade,
        DATE_FORMAT(validade, '%Y-%m-%d') AS validade,
        quantidade_minima
       FROM produtos
       ORDER BY id DESC`
    );

    return res.json(produtos);

  } catch (erro) {
    console.error('Erro ao listar produtos:', erro);

    return res.status(500).json({
      erro: 'Não foi possível consultar os produtos.'
    });
  }
}

// POST - Cadastrar um novo produto
async function cadastrarProduto(req, res) {
  try {
    const {
      nome,
      categoria,
      quantidade,
      unidade,
      validade,
      quantidade_minima
    } = req.body;

    const qtd = Number(quantidade);
    const minimo = Number(quantidade_minima);

    if (
      typeof nome !== 'string' ||
      !nome.trim() ||
      typeof categoria !== 'string' ||
      !categoria.trim() ||
      typeof unidade !== 'string' ||
      !unidade.trim() ||
      !Number.isInteger(qtd) ||
      qtd < 0 ||
      !Number.isInteger(minimo) ||
      minimo < 0
    ) {
      return res.status(400).json({
        erro: 'Preencha corretamente os dados do produto.'
      });
    }

    let dataValidade = null;

    if (validade) {
      const data = String(validade);

      if (!/^\d{4}-\d{2}-\d{2}$/.test(data)) {
        return res.status(400).json({
          erro: 'A validade deve estar no formato AAAA-MM-DD.'
        });
      }

      const dataConvertida = new Date(`${data}T12:00:00Z`);

      if (
        Number.isNaN(dataConvertida.getTime()) ||
        dataConvertida.toISOString().slice(0, 10) !== data
      ) {
        return res.status(400).json({
          erro: 'Informe uma data de validade válida.'
        });
      }

      dataValidade = data;
    }

    const sql = `
      INSERT INTO produtos
      (nome, categoria, quantidade, unidade, validade, quantidade_minima)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [resultado] = await conexao.execute(sql, [
      nome.trim(),
      categoria.trim(),
      qtd,
      unidade.trim(),
      dataValidade,
      minimo
    ]);

    return res.status(201).json({
      mensagem: 'Produto cadastrado com sucesso!',
      id: resultado.insertId
    });

  } catch (erro) {
    console.error('Erro ao cadastrar produto:', erro);

    return res.status(500).json({
      erro: 'Não foi possível cadastrar o produto.'
    });
  }
}

module.exports = {
  listarProdutos,
  cadastrarProduto
};