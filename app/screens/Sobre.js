import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { Cartao } from '../components/Bloco';
import { cores } from '../components/tema';

export default function Sobre() {
  return <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.titulo}>Sobre o Estoque+</Text>
    <Cartao titulo="Problema" descricao="Pequenos comércios podem ter prejuízos por desorganização do estoque, vencimento de produtos e falta de acompanhamento das quantidades." />
    <Cartao titulo="Solução" descricao="Aplicativo para organizar produtos, controlar quantidades e validades e mostrar alertas para reduzir perdas." />
    <Cartao titulo="Público-alvo" descricao="Pequenos mercados, mercearias, minimercados e seus colaboradores." />
    <Cartao titulo="Gerente" descricao="Poderá consultar, cadastrar, editar e excluir produtos, além de gerenciar funcionários." />
    <Cartao titulo="Funcionário" descricao="Poderá consultar produtos, atualizar quantidades e acompanhar alertas. Não poderá excluir produtos nem gerenciar usuários." />
    <Cartao titulo="Próximas entregas" descricao="Entrega 2: MySQL e API. Entrega 3: CRUD, login, JWT e permissões. Entrega 4: testes e APK." />
  </ScrollView>;
}
const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  titulo: { fontSize: 23, fontWeight: 'bold', color: cores.texto, marginBottom: 20 }
});
