import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { tema } from './tema';
const itens=[{nome:'Inicio',titulo:'Início',icone:'home-outline',ativo:'home'},{nome:'Produtos',titulo:'Produtos',icone:'cube-outline',ativo:'cube'},{nome:'Alertas',titulo:'Alertas',icone:'notifications-outline',ativo:'notifications'},{nome:'Sobre',titulo:'Sobre',icone:'information-circle-outline',ativo:'information-circle'}];
export default function BottomNav({navigation,route}){
 return <View style={s.area}><View style={s.barra}>{itens.map(item=>{const ativo=route.name===item.nome;return <Pressable key={item.nome} onPress={()=>navigation.navigate(item.nome)} style={[s.botao,ativo&&s.ativo]}><Ionicons name={ativo?item.ativo:item.icone} size={19} color={ativo?tema.branco:tema.secundario}/><Text style={[s.rotulo,ativo&&s.rotuloAtivo]}>{item.titulo}</Text></Pressable>})}</View></View>;
}
const s=StyleSheet.create({area:{paddingHorizontal:16,paddingBottom:Platform.OS==='web'?15:8,paddingTop:7,backgroundColor:'transparent'},barra:{flexDirection:'row',backgroundColor:tema.branco,borderWidth:1,borderColor:tema.borda,borderRadius:26,padding:6,maxWidth:520,width:'100%',alignSelf:'center',elevation:8,shadowColor:'#17395E',shadowOpacity:0.12,shadowRadius:18,shadowOffset:{width:0,height:8}},botao:{flex:1,alignItems:'center',justifyContent:'center',gap:4,paddingVertical:10,borderRadius:19},ativo:{backgroundColor:tema.azul},rotulo:{fontSize:10,fontWeight:'700',color:tema.secundario},rotuloAtivo:{color:tema.branco}});
