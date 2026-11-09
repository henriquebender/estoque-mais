const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const conexao = require('../conexao');

function gerarToken(usuario) {
  return jwt.sign(
    {
      id: usuario.id,
      perfil: usuario.perfil
    },
    process.env.JWT_SECRET,
    {
      algorithm: 'HS256',
      expiresIn: process.env.JWT_EXPIRES_IN || '8h'
    }
  );
}

async function cadastroInicial(req, res) {
  let conexaoBanco;

  try {
    const { nome, email, senha } = req.body;

    if (
      typeof nome !== 'string' ||
      !nome.trim() ||
      typeof email !== 'string' ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      typeof senha !== 'string' ||
      senha.length < 8 ||
      Buffer.byteLength(senha, 'utf8') > 72
    ) {
      return res.status(400).json({
        erro: 'Informe nome, e-mail válido e senha de 8 a 72 bytes.'
      });
    }

    conexaoBanco = await conexao.getConnection();

    await conexaoBanco.beginTransaction();

    // Impede dois cadastros iniciais simultâneos.
    await conexaoBanco.query(
      "SELECT GET_LOCK('estoque_mais_primeiro_gerente', 10) AS bloqueio"
    ).then(async ([linhas]) => {
      if (linhas[0].bloqueio !== 1) {
        throw new Error('Não foi possível iniciar o cadastro.');
      }
    });

    const [[resultado]] = await conexaoBanco.query(
      'SELECT COUNT(*) AS total FROM usuarios'
    );

    if (resultado.total > 0) {
      await conexaoBanco.rollback();

      return res.status(403).json({
        erro: 'O gerente inicial já foi cadastrado.'
      });
    }

    const senhaHash = await bcrypt.hash(senha, 12);

    const [novo] = await conexaoBanco.execute(
      `INSERT INTO usuarios
       (nome, email, senha_hash, perfil)
       VALUES (?, ?, ?, 'gerente')`,
      [
        nome.trim(),
        email.trim().toLowerCase(),
        senhaHash
      ]
    );

    await conexaoBanco.commit();

    return res.status(201).json({
      mensagem: 'Gerente inicial cadastrado!',
      usuario: {
        id: novo.insertId,
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        perfil: 'gerente'
      }
    });

  } catch (erro) {
    if (conexaoBanco) {
      await conexaoBanco.rollback().catch(() => {});
    }

    if (erro.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        erro: 'Este e-mail já está cadastrado.'
      });
    }

    console.error(erro);

    return res.status(500).json({
      erro: 'Não foi possível cadastrar o gerente.'
    });

  } finally {
    if (conexaoBanco) {
      await conexaoBanco.query(
        "SELECT RELEASE_LOCK('estoque_mais_primeiro_gerente')"
      ).catch(() => {});

      conexaoBanco.release();
    }
  }
}

async function cadastrarFuncionario(req, res) {
  try {
    const { nome, email, senha } = req.body;

    if (
      typeof nome !== 'string' ||
      !nome.trim() ||
      typeof email !== 'string' ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      typeof senha !== 'string' ||
      senha.length < 8 ||
      Buffer.byteLength(senha, 'utf8') > 72
    ) {
      return res.status(400).json({
        erro: 'Informe nome, e-mail válido e senha de 8 a 72 bytes.'
      });
    }

    const senhaHash = await bcrypt.hash(senha, 12);

    const [resultado] = await conexao.execute(
      `INSERT INTO usuarios
       (nome, email, senha_hash, perfil)
       VALUES (?, ?, ?, 'funcionario')`,
      [
        nome.trim(),
        email.trim().toLowerCase(),
        senhaHash
      ]
    );

    return res.status(201).json({
      mensagem: 'Funcionário cadastrado com sucesso!',
      usuario: {
        id: resultado.insertId,
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        perfil: 'funcionario'
      }
    });

  } catch (erro) {
    if (erro.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        erro: 'Este e-mail já está cadastrado.'
      });
    }

    console.error(erro);

    return res.status(500).json({
      erro: 'Não foi possível cadastrar o funcionário.'
    });
  }
}

async function login(req, res) {
  try {
    const { email, senha } = req.body;

    if (
      typeof email !== 'string' ||
      typeof senha !== 'string'
    ) {
      return res.status(400).json({
        erro: 'Informe e-mail e senha.'
      });
    }

    const [usuarios] = await conexao.execute(
      `SELECT id, nome, email, senha_hash, perfil
       FROM usuarios
       WHERE email = ?`,
      [email.trim().toLowerCase()]
    );

    const usuario = usuarios[0];

    if (
      !usuario ||
      !(await bcrypt.compare(senha, usuario.senha_hash))
    ) {
      return res.status(401).json({
        erro: 'E-mail ou senha incorretos.'
      });
    }

    return res.json({
      mensagem: 'Login realizado com sucesso!',
      token: gerarToken(usuario),
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil
      }
    });

  } catch (erro) {
    console.error(erro);

    return res.status(500).json({
      erro: 'Não foi possível realizar o login.'
    });
  }
}

async function perfil(req, res) {
  try {
    const [usuarios] = await conexao.execute(
      `SELECT id, nome, email, perfil
       FROM usuarios
       WHERE id = ?`,
      [req.usuario.id]
    );

    if (!usuarios.length) {
      return res.status(401).json({
        erro: 'Usuário não encontrado.'
      });
    }

    return res.json(usuarios[0]);

  } catch (erro) {
    console.error(erro);

    return res.status(500).json({
      erro: 'Não foi possível consultar o perfil.'
    });
  }
}

module.exports = {
  cadastroInicial,
  cadastrarFuncionario,
  login,
  perfil
};