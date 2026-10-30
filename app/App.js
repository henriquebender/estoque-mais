import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Inicio from './screens/Inicio';
import Produtos from './screens/Produtos';
import Alertas from './screens/Alertas';
import Sobre from './screens/Sobre';
import BottomNav from './components/BottomNav';
import { tema } from './components/tema';

const Stack = createNativeStackNavigator();
const telas = { Inicio, Produtos, Alertas, Sobre };

function Moldura({ navigation, route }) {
  const Tela = telas[route.name];

  return (
    <SafeAreaView style={estilos.areaSegura} edges={['top', 'bottom']}>
      <View style={estilos.conteudo}>
        <Tela navigation={navigation} />
      </View>
      <BottomNav navigation={navigation} route={route} />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor={tema.fundo} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Inicio"
          screenOptions={{ headerShown: false, animation: 'fade' }}
        >
          {Object.keys(telas).map((nome) => (
            <Stack.Screen key={nome} name={nome} component={Moldura} />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const estilos = StyleSheet.create({
  areaSegura: { flex: 1, backgroundColor: tema.fundo },
  conteudo: { flex: 1 },
});
