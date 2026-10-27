import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Inicio from './screens/Inicio';
import Produtos from './screens/Produtos';
import Alertas from './screens/Alertas';
import Sobre from './screens/Sobre';
import { cores } from './components/tema';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: { backgroundColor: cores.branco },
        headerTintColor: cores.texto,
        headerTitleStyle: { fontWeight: 'bold' },
        contentStyle: { backgroundColor: cores.fundo }
      }}>
        <Stack.Screen name="Inicio" component={Inicio} options={{ title: 'Estoque+' }} />
        <Stack.Screen name="Produtos" component={Produtos} options={{ title: 'Produtos' }} />
        <Stack.Screen name="Alertas" component={Alertas} options={{ title: 'Alertas do estoque' }} />
        <Stack.Screen name="Sobre" component={Sobre} options={{ title: 'Sobre o projeto' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
