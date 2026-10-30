export const produtos = [
 { id:'arroz', nome:'Arroz 5 kg', categoria:'Grãos', quantidade:12, unidade:'un.', validade:'15/12/2026', status:['ok'], icone:'🌾' },
 { id:'leite', nome:'Leite integral 1 L', categoria:'Bebidas', quantidade:8, unidade:'un.', validade:'02/11/2026', status:['validade'], icone:'🥛' },
 { id:'macarrao', nome:'Macarrão 500 g', categoria:'Massas', quantidade:20, unidade:'un.', validade:'20/04/2027', status:['ok'], icone:'🍝' },
 { id:'iogurte', nome:'Iogurte natural', categoria:'Laticínios', quantidade:3, unidade:'un.', validade:'30/10/2026', status:['validade','baixo'], icone:'🥣' },
];
export const avisosValidade = [
 { id:'v1', produto:'Iogurte natural', valor:'30/10/2026' },
 { id:'v2', produto:'Leite integral 1 L', valor:'02/11/2026' },
];
export const avisosEstoque = [{ id:'e1', produto:'Iogurte natural', valor:'3 unidades' }];
