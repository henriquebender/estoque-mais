import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { Cartao } from '../components/Bloco';
import { cores } from '../components/tema';

export default function Alertas() {
  return <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.titulo}>Atenção ao estoque</Text>
    <Text style={styles.intro}>Exemplos de alertas previstos para o sistema.</Text>
    <Cartao titulo="Validade próxima" descricao="Leite integral 1 L — vence em 02/11/2026." detalhe="Priorizar a venda ou o uso." corFundo={cores.amarelo} />
    <Cartao titulo="Estoque baixo" descricao="Iogurte natural — apenas 3 unidades." detalhe="Verificar a necessidade de reposição." corFundo={cores.vermelho} />
    <Cartao titulo="Como funcionará depois?" descricao="Na Entrega 2, os alertas serão calculados a partir dos produtos armazenados no banco de dados. Nesta versão são apenas exemplos." />
  </ScrollView>;
}
const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  titulo: { fontSize: 23, fontWeight: 'bold', color: cores.texto, marginBottom: 8 },
  intro: { color: cores.secundario, marginBottom: 20, fontSize: 14 }
});
