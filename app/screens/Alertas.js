import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { Cabecalho, AvisoCard } from '../components/Bloco';
import { avisosValidade, avisosEstoque } from '../data/demoData';
import { tema } from '../components/tema';
export default function Alertas(){return <ScrollView contentContainerStyle={s.conteudo}><Cabecalho etiqueta="ACOMPANHAMENTO" titulo="Alertas" descricao="Produtos que merecem atenção para reduzir perdas e desperdícios."/><Text style={s.secao}>Atenção à validade</Text>{avisosValidade.map(a=><AvisoCard key={a.id} titulo="Validade próxima" produto={a.produto} detalhe="Data de validade" valor={a.valor} tipo="validade"/>)}<Text style={s.secao}>Estoque baixo</Text>{avisosEstoque.map(a=><AvisoCard key={a.id} titulo="Estoque baixo" produto={a.produto} detalhe="Quantidade disponível" valor={a.valor} tipo="baixo"/>)}<Text style={s.nota}>Avisos ilustrativos. A geração automática será implementada nas próximas entregas.</Text></ScrollView>}
const s=StyleSheet.create({conteudo:{paddingHorizontal:20,paddingTop:30,paddingBottom:20,maxWidth:520,width:'100%',alignSelf:'center'},secao:{fontSize:18,fontWeight:'800',color:tema.texto,marginBottom:13,marginTop:12},nota:{fontSize:12,color:tema.secundario,lineHeight:20,marginTop:13}});
