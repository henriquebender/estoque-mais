import { Platform } from 'react-native';

// Para testar no navegador, usamos localhost.
// Para testar no celular, será necessário informar
// o endereço IPv4 do computador.
const IP_DO_COMPUTADOR = '192.168.1.100';

const BASE_URL =
  Platform.OS === 'web'
    ? 'http://localhost:3000'
    : `http://${IP_DO_COMPUTADOR}:3000`;

// Função que faz as requisições à API
async function requisicao(caminho, opcoes = {}) {
  try {
    const resposta = await fetch(`${BASE_URL}${caminho}`, {
      ...opcoes,

      headers: {
        'Content-Type': 'application/json',
        ...(opcoes.headers || {})
      }
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      throw new Error(
        dados.erro || 'Ocorreu um erro na API.'
      );
    }

    return dados;

  } catch (erro) {
    if (erro instanceof TypeError) {
      throw new Error(
        'Não foi possível conectar à API. Verifique se o servidor está ligado.'
      );
    }

    throw erro;
  }
}

// GET - Buscar produtos
export async function listarProdutos() {
  return requisicao('/produtos');
}

// POST - Cadastrar produto
export async function cadastrarProduto(produto) {
  return requisicao('/produtos', {
    method: 'POST',
    body: JSON.stringify(produto)
  });
}