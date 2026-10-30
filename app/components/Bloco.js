import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { tema } from './tema';

export function Cabecalho({ etiqueta, titulo, descricao }) {
 return <View style={s.cabecalho}><Text style={s.etiqueta}>{etiqueta.toUpperCase()}</Text><Text style={s.titulo}>{titulo}</Text>{descricao ? <Text style={s.descricao}>{descricao}</Text> : null}</View>;
}
export function Cartao({ children, style }) { return <View style={[s.cartao,style]}>{children}</View>; }
export function Atalho({ icone, titulo, descricao, onPress }) {
 return <Pressable onPress={onPress} style={s.atalho}><View style={s.icone}><Text style={s.iconeTexto}>{icone}</Text></View><View style={{flex:1}}><Text style={s.atalhoTitulo}>{titulo}</Text><Text style={s.descricao}>{descricao}</Text></View><Text style={s.seta}>›</Text></Pressable>;
}
export function Etiqueta({ tipo }) {
 const cfg = tipo === 'validade' ? ['Validade próxima',tema.vermelho,tema.vermelhoClaro] : tipo === 'baixo' ? ['Estoque baixo',tema.amarelo,tema.amareloClaro] : ['Em dia',tema.verde,tema.verdeClaro];
 return <View style={[s.etiquetaBox,{backgroundColor:cfg[2]}]}><Text style={[s.etiquetaTexto,{color:cfg[1]}]}>{cfg[0]}</Text></View>;
}
export function ProdutoCard({ produto }) {
 const tom = produto.status.includes('validade') ? tema.vermelho : produto.status.includes('baixo') ? tema.amarelo : tema.borda;
 return <Cartao style={{borderLeftWidth:4,borderLeftColor:tom}}><View style={s.produtoLinha}><View style={s.produtoIcone}><Text style={{fontSize:24}}>{produto.icone}</Text></View><View style={{flex:1}}><Text style={s.nome}>{produto.nome}</Text><Text style={s.descricao}>{produto.categoria}</Text></View><View style={{alignItems:'flex-end'}}><Text style={s.qtd}>{produto.quantidade}</Text><Text style={s.descricao}>{produto.unidade}</Text></View></View><View style={s.linhaEtiquetas}>{produto.status.map(t=><Etiqueta key={t} tipo={t}/>)}</View><View style={s.rodape}><Text style={s.descricao}>Data de validade</Text><Text style={s.valor}>{produto.validade}</Text></View></Cartao>;
}
export function AvisoCard({ titulo, produto, detalhe, valor, tipo }) {
 const cor = tipo === 'validade' ? tema.vermelho : tema.amarelo;
 const claro = tipo === 'validade' ? tema.vermelhoClaro : tema.amareloClaro;
 return <Cartao style={{borderLeftWidth:4,borderLeftColor:cor}}><View style={{flexDirection:'row',alignItems:'center',gap:12}}><View style={[s.icone,{backgroundColor:claro}]}><Text style={{fontSize:21}}>{tipo==='validade'?'◷':'↘'}</Text></View><View style={{flex:1}}><Text style={[s.nome,{color:cor}]}>{titulo}</Text><Text style={s.descricao}>{produto}</Text></View></View><View style={s.rodape}><Text style={s.descricao}>{detalhe}</Text><Text style={s.valor}>{valor}</Text></View></Cartao>;
}
const s=StyleSheet.create({
 cabecalho:{marginBottom:24}, etiqueta:{fontSize:11,fontWeight:'800',letterSpacing:2,color:tema.azul,marginBottom:9}, titulo:{fontSize:30,fontWeight:'800',color:tema.texto,letterSpacing:-0.8}, descricao:{fontSize:13,color:tema.secundario,lineHeight:20,marginTop:4},
 cartao:{backgroundColor:tema.branco,borderRadius:19,padding:18,borderWidth:1,borderColor:tema.borda,marginBottom:13},
 atalho:{flexDirection:'row',alignItems:'center',backgroundColor:tema.branco,borderWidth:1,borderColor:tema.borda,borderRadius:18,padding:16,marginBottom:12,gap:12},
 icone:{width:45,height:45,borderRadius:13,backgroundColor:tema.azulClaro,alignItems:'center',justifyContent:'center'}, iconeTexto:{fontSize:22,color:tema.azul},
 atalhoTitulo:{fontSize:15,fontWeight:'800',color:tema.texto},seta:{fontSize:27,color:tema.azul},
 etiquetaBox:{borderRadius:30,paddingHorizontal:10,paddingVertical:6},etiquetaTexto:{fontSize:11,fontWeight:'800'},
 produtoLinha:{flexDirection:'row',alignItems:'center',gap:12},produtoIcone:{height:52,width:52,borderRadius:15,backgroundColor:tema.azulClaro,alignItems:'center',justifyContent:'center'},
 nome:{fontSize:15,fontWeight:'800',color:tema.texto},qtd:{fontSize:21,fontWeight:'800',color:tema.texto},linhaEtiquetas:{flexDirection:'row',flexWrap:'wrap',gap:7,marginTop:15},
 rodape:{borderTopWidth:1,borderTopColor:tema.borda,marginTop:15,paddingTop:12,flexDirection:'row',justifyContent:'space-between',alignItems:'center'},valor:{fontSize:13,fontWeight:'800',color:tema.texto},
});
