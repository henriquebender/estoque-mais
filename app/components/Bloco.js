import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { cores } from './tema';

export function Cartao({ titulo, descricao, detalhe, corFundo }) {
  return <View style={[styles.cartao, corFundo ? { backgroundColor: corFundo } : null]}>
    <Text style={styles.titulo}>{titulo}</Text>
    {descricao ? <Text style={styles.descricao}>{descricao}</Text> : null}
    {detalhe ? <Text style={styles.detalhe}>{detalhe}</Text> : null}
  </View>;
}

export function Botao({ titulo, onPress }) {
  return <TouchableOpacity style={styles.botao} onPress={onPress} accessibilityRole="button">
    <Text style={styles.botaoTexto}>{titulo}</Text>
  </TouchableOpacity>;
}

const styles = StyleSheet.create({
  cartao: { backgroundColor: cores.branco, padding: 18, borderRadius: 16, borderWidth: 1, borderColor: cores.borda, marginBottom: 12 },
  titulo: { color: cores.texto, fontWeight: 'bold', fontSize: 17, marginBottom: 5 },
  descricao: { color: cores.secundario, fontSize: 14, lineHeight: 21 },
  detalhe: { color: cores.verde, fontSize: 13, fontWeight: '600', marginTop: 8 },
  botao: { backgroundColor: cores.verde, padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 12 },
  botaoTexto: { color: cores.branco, fontWeight: 'bold', fontSize: 15 }
});
