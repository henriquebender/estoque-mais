import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Botao, Cartao } from '../components/Bloco';
import { cores } from '../components/tema';

export default function Inicio({ navigation }) {
  return <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.destaque}>
      <Text style={styles.marca}>ESTOQUE+</Text>
      <Text style={styles.titulo}>Seu estoque mais organizado.</Text>
      <Text style={styles.texto}>Controle mercadorias e acompanhe produtos que precisam de atenção.</Text>
    </View>
    <Text style={styles.secao}>Acesso rápido</Text>
    <Botao titulo="Ver produtos" onPress={() => navigation.navigate('Produtos')} />
    <Botao titulo="Ver alertas" onPress={() => navigation.navigate('Alertas')} />
    <Botao titulo="Sobre o projeto" onPress={() => navigation.navigate('Sobre')} />
    <Text style={styles.secao}>Nesta primeira entrega</Text>
    <Cartao titulo="Protótipo navegável" descricao="As telas e a navegação estão funcionando. Os produtos são exemplos temporários; o banco de dados e o login serão integrados nas próximas entregas." />
  </ScrollView>;
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  destaque: { backgroundColor: cores.verdeClaro, padding: 24, borderRadius: 20, marginBottom: 25 },
  marca: { fontSize: 13, fontWeight: 'bold', color: cores.verde, letterSpacing: 2, marginBottom: 12 },
  titulo: { fontSize: 29, fontWeight: 'bold', color: cores.texto, marginBottom: 10 },
  texto: { fontSize: 15, lineHeight: 23, color: cores.secundario },
  secao: { fontSize: 19, fontWeight: 'bold', color: cores.texto, marginBottom: 14 }
});
