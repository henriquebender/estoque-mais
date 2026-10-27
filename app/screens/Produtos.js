import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { Cartao } from '../components/Bloco';
import { cores } from '../components/tema';

// Dados demonstrativos: serão substituídos por dados do MySQL na Entrega 2.
const produtosExemplo = [
  { id: 1, nome: 'Arroz 5 kg', quantidade: 12, validade: '15/12/2026' },
  { id: 2, nome: 'Leite integral 1 L', quantidade: 8, validade: '02/11/2026' },
  { id: 3, nome: 'Macarrão 500 g', quantidade: 20, validade: '20/04/2027' },
  { id: 4, nome: 'Iogurte natural', quantidade: 3, validade: '30/10/2026' }
];

export default function Produtos() {
  return <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.titulo}>Produtos cadastrados</Text>
    <Text style={styles.intro}>Visualização demonstrativa do estoque comercial.</Text>
    {produtosExemplo.map((produto) => <Cartao
      key={produto.id}
      titulo={produto.nome}
      descricao={`Quantidade: ${produto.quantidade} unidades`}
      detalhe={`Validade: ${produto.validade}`}
    />)}
    <Text style={styles.aviso}>O cadastro, a edição e a exclusão serão implementados com a API e o MySQL nas próximas entregas.</Text>
  </ScrollView>;
}
const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  titulo: { fontSize: 23, fontWeight: 'bold', color: cores.texto, marginBottom: 8 },
  intro: { fontSize: 14, color: cores.secundario, marginBottom: 20 },
  aviso: { color: cores.secundario, lineHeight: 21, fontSize: 13, marginTop: 10 }
});
