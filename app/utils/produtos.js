// Converte AAAA-MM-DD para DD/MM/AAAA
export function exibirData(valor) {
  if (!valor) {
    return 'Sem validade';
  }

  const data = String(valor).slice(0, 10);
  const partes = data.split('-');

  if (partes.length !== 3) {
    return data;
  }

  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

// Calcula a situação de um produto
export function statusProduto(produto) {
  const status = [];

  // Verificar validade
  if (produto.validade) {
    const data = String(produto.validade).slice(0, 10);

    const vencimento = new Date(`${data}T12:00:00`);

    const hoje = new Date();
    hoje.setHours(12, 0, 0, 0);

    const diferenca = vencimento.getTime() - hoje.getTime();

    const dias = Math.ceil(
      diferenca / (1000 * 60 * 60 * 24)
    );

    // Vencido ou faltando até 7 dias
    if (dias <= 7) {
      status.push('validade');
    }
  }

  // Verificar quantidade
  const quantidade = Number(produto.quantidade);

  const quantidadeMinima = Number(
    produto.quantidade_minima
  );

  if (quantidade <= quantidadeMinima) {
    status.push('baixo');
  }

  // Nenhum alerta
  if (status.length === 0) {
    status.push('ok');
  }

  return status;
}

// Prepara os dados para os componentes visuais
export function prepararProduto(produto) {
  const status = statusProduto(produto);

  const icones = {
    'Grãos': '🌾',
    'Bebidas': '🥛',
    'Massas': '🍝',
    'Laticínios': '🥣'
  };

  return {
    ...produto,

    validade: exibirData(produto.validade),

    status: status,

    icone: icones[produto.categoria] || '📦'
  };
}