import { Platform } from 'react-native';

const IP_DO_COMPUTADOR = '192.168.1.100';

const BASE_URL =
  Platform.OS === 'web'
    ? 'http://localhost:3000'
    : `http://${IP_DO_COMPUTADOR}:3000`;

let tokenAtual = null;

export function configurarToken(token) {
  tokenAtual = token || null;
}

async function requisicao(caminho, opcoes = {}) {
  let resposta;

  try {
    resposta = await fetch(`${BASE_URL}${caminho}`, {
      ...opcoes,
      headers: {
        'Content-Type': 'application/json',
        ...(tokenAtual
          ? { Authorization: `Bearer ${tokenAtual}` }
          : {}),
        ...(opcoes.headers || {})
      }
    });
  } catch (erro) {
    throw new Error(
      'Não foi possível conectar à API. Verifique o servidor.'
    );
  }

  let dados;

  try {
    dados = await resposta.json();
  } catch {
    throw new Error('A API retornou uma resposta inválida.');
  }

  if (!resposta.ok) {
    const erro = new Error(
      dados.erro || 'Erro na requisição.'
    );

    erro.status = resposta.status;

    throw erro;
  }

  return dados;
}

// Autenticação

export function cadastrarGerente(dados) {
  return requisicao('/auth/primeiro-gerente', {
    method: 'POST',
    body: JSON.stringify(dados)
  });
}

export function cadastrarFuncionario(dados) {
  return requisicao('/auth/funcionarios', {
    method: 'POST',
    body: JSON.stringify(dados)
  });
}

export function fazerLogin(email, senha) {
  return requisicao('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, senha })
  });
}

export function consultarPerfil() {
  return requisicao('/auth/perfil');
}

// Produtos

export function listarProdutos() {
  return requisicao('/produtos');
}

export function cadastrarProduto(produto) {
  return requisicao('/produtos', {
    method: 'POST',
    body: JSON.stringify(produto)
  });
}

export function editarProduto(id, produto) {
  return requisicao(`/produtos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(produto)
  });
}

export function atualizarQuantidade(id, quantidade) {
  return requisicao(`/produtos/${id}/quantidade`, {
    method: 'PATCH',
    body: JSON.stringify({ quantidade })
  });
}

export function excluirProduto(id) {
  return requisicao(`/produtos/${id}`, {
    method: 'DELETE'
  });
}