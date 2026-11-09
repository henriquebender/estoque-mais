const conexao = require('../conexao');

function validarProduto(dados) {
  const {
    nome, categoria, quantidade,
    unidade, validade, quantidade_minima
  } = dados;

  if (
    typeof nome !== 'string' || !nome.trim() ||
    typeof categoria !== 'string' || !categoria.trim() ||
    typeof unidade !== 'string' || !unidade.trim() ||
    !Number.isInteger(Number(quantidade)) ||
    Number(quantidade) < 0 ||
    !Number.isInteger(Number(quantidade_minima)) ||
    Number(quantidade_minima) < 0
  ) {
    return 'Preencha corretamente os campos do produto.';
  }

  if (validade) {
    if (
      typeof validade !== 'string' ||
      !/^\d{4}-\d{2}-\d{2}$/.test(validade)
    ) {
      return 'Use o formato AAAA-MM-DD para a validade.';
    }

    const data = new Date(`${validade}T12:00:00Z`);

    if (
      Number.isNaN(data.getTime()) ||
      data.toISOString().slice(0, 10) !== validade
    ) {
      return 'Informe uma data de validade válida.';
    }
  }

  return null;
}

function idValido(id) {
  return /^[1-9]\d*$/.test(String(id)) &&
    Number.isSafeInteger(Number(id));
}

async function listarProdutos(req, res) {
  try {
    const [produtos] = await conexao.query(
      `SELECT id, nome, categoria, quantidade,
              unidade,
              DATE_FORMAT(validade, '%Y-%m-%d') AS validade,
              quantidade_minima
       FROM produtos
       ORDER BY id DESC`
    );

    return res.json(produtos);
  } catch (erro) {
    console.error(erro);

    return res.status(500).json({
      erro: 'Erro ao consultar produtos.'
    });
  }
}

async function cadastrarProduto(req, res) {
  try {
    const erro = validarProduto(req.body);

    if (erro) {
      return res.status(400).json({ erro });
    }

    const {
      nome, categoria, quantidade,
      unidade, validade, quantidade_minima
    } = req.body;

    const [resultado] = await conexao.execute(
      `INSERT INTO produtos
       (nome, categoria, quantidade, unidade,
        validade, quantidade_minima)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        nome.trim(),
        categoria.trim(),
        Number(quantidade),
        unidade.trim(),
        validade || null,
        Number(quantidade_minima)
      ]
    );

    return res.status(201).json({
      mensagem: 'Produto cadastrado!',
      id: resultado.insertId
    });
  } catch (erro) {
    console.error(erro);

    return res.status(500).json({
      erro: 'Erro ao cadastrar produto.'
    });
  }
}

async function editarProduto(req, res) {
  try {
    if (!idValido(req.params.id)) {
      return res.status(400).json({
        erro: 'Identificador inválido.'
      });
    }

    const erro = validarProduto(req.body);

    if (erro) {
      return res.status(400).json({ erro });
    }

    const {
      nome, categoria, quantidade,
      unidade, validade, quantidade_minima
    } = req.body;

    const [resultado] = await conexao.execute(
      `UPDATE produtos
       SET nome = ?, categoria = ?, quantidade = ?,
           unidade = ?, validade = ?, quantidade_minima = ?
       WHERE id = ?`,
      [
        nome.trim(),
        categoria.trim(),
        Number(quantidade),
        unidade.trim(),
        validade || null,
        Number(quantidade_minima),
        Number(req.params.id)
      ]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        erro: 'Produto não encontrado.'
      });
    }

    return res.json({
      mensagem: 'Produto atualizado!'
    });
  } catch (erro) {
    console.error(erro);

    return res.status(500).json({
      erro: 'Erro ao editar produto.'
    });
  }
}

async function atualizarQuantidade(req, res) {
  try {
    if (!idValido(req.params.id)) {
      return res.status(400).json({
        erro: 'Identificador inválido.'
      });
    }

    const { quantidade } = req.body;

    if (
      quantidade === undefined ||
      quantidade === null ||
      quantidade === '' ||
      !Number.isInteger(Number(quantidade)) ||
      Number(quantidade) < 0
    ) {
      return res.status(400).json({
        erro: 'Informe uma quantidade válida.'
      });
    }

    const [resultado] = await conexao.execute(
      `UPDATE produtos
       SET quantidade = ?
       WHERE id = ?`,
      [
        Number(quantidade),
        Number(req.params.id)
      ]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        erro: 'Produto não encontrado.'
      });
    }

    return res.json({
      mensagem: 'Quantidade atualizada!'
    });
  } catch (erro) {
    console.error(erro);

    return res.status(500).json({
      erro: 'Erro ao atualizar quantidade.'
    });
  }
}

async function excluirProduto(req, res) {
  try {
    if (!idValido(req.params.id)) {
      return res.status(400).json({
        erro: 'Identificador inválido.'
      });
    }

    const [resultado] = await conexao.execute(
      'DELETE FROM produtos WHERE id = ?',
      [Number(req.params.id)]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        erro: 'Produto não encontrado.'
      });
    }

    return res.json({
      mensagem: 'Produto excluído!'
    });
  } catch (erro) {
    console.error(erro);

    return res.status(500).json({
      erro: 'Erro ao excluir produto.'
    });
  }
}

module.exports = {
  listarProdutos,
  cadastrarProduto,
  editarProduto,
  atualizarQuantidade,
  excluirProduto
};