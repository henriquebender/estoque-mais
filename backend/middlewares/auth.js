const jwt = require('jsonwebtoken');

function autenticar(req, res, next) {
  const cabecalho = req.headers.authorization || '';

  const partes = cabecalho.split(' ');

  if (
    partes.length !== 2 ||
    partes[0] !== 'Bearer' ||
    !partes[1]
  ) {
    return res.status(401).json({
      erro: 'Token não informado. Faça login.'
    });
  }

  try {
    const dados = jwt.verify(
      partes[1],
      process.env.JWT_SECRET,
      { algorithms: ['HS256'] }
    );

    req.usuario = {
      id: dados.id,
      perfil: dados.perfil
    };

    next();

  } catch (erro) {
    return res.status(401).json({
      erro: 'Token inválido ou expirado.'
    });
  }
}

function permitir(...perfis) {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({
        erro: 'Usuário não autenticado.'
      });
    }

    if (!perfis.includes(req.usuario.perfil)) {
      return res.status(403).json({
        erro: 'Você não tem permissão para esta operação.'
      });
    }

    next();
  };
}

module.exports = {
  autenticar,
  permitir
};