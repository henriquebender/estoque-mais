import React from 'react';

import {
  View,
  Text,
  ActivityIndicator,
  Pressable,
  StyleSheet,
  StatusBar
} from 'react-native';

import {
  NavigationContainer
} from '@react-navigation/native';

import {
  createNativeStackNavigator
} from '@react-navigation/native-stack';

import {
  SafeAreaProvider,
  SafeAreaView
} from 'react-native-safe-area-context';

import Inicio from './screens/Inicio';
import Produtos from './screens/Produtos';
import Alertas from './screens/Alertas';
import Sobre from './screens/Sobre';

import Login from './screens/Login';
import Cadastro from './screens/Cadastro';

import BottomNav from './components/BottomNav';

import {
  AuthProvider,
  useAuth
} from './context/AuthContext';

import { tema } from './components/tema';

const Stack = createNativeStackNavigator();

const telas = {
  Inicio,
  Produtos,
  Alertas,
  Sobre
};

function Moldura({ navigation, route }) {
  const Tela = telas[route.name];

  return (
    <SafeAreaView
      style={s.areaSegura}
      edges={['top', 'bottom']}
    >
      <View style={s.conteudo}>
        <Tela navigation={navigation} />
      </View>

      <BottomNav
        navigation={navigation}
        route={route}
      />
    </SafeAreaView>
  );
}

function PainelInicio({ navigation }) {
  const { usuario, sair } = useAuth();

  return (
    <SafeAreaView
      style={s.areaSegura}
      edges={['top', 'bottom']}
    >
      <View style={s.faixaUsuario}>
        <View style={{ flex: 1 }}>
          <Text style={s.nomeUsuario}>
            {usuario?.nome}
          </Text>

          <Text style={s.perfil}>
            {usuario?.perfil === 'gerente'
              ? 'Gerente'
              : 'Funcionário'}
          </Text>
        </View>

        {usuario?.perfil === 'gerente' ? (
          <Pressable
            onPress={() => navigation.navigate('Cadastro')}
            style={s.botaoUsuario}
          >
            <Text style={s.botaoUsuarioTexto}>
              + Funcionário
            </Text>
          </Pressable>
        ) : null}

        <Pressable
          onPress={sair}
          style={s.botaoSair}
        >
          <Text style={s.sairTexto}>Sair</Text>
        </Pressable>
      </View>

      <View style={s.conteudo}>
        <Inicio navigation={navigation} />
      </View>

      <BottomNav
        navigation={navigation}
        route={{ name: 'Inicio' }}
      />
    </SafeAreaView>
  );
}

function Navegacao() {
  const { usuario, carregando } = useAuth();

  if (carregando) {
    return (
      <View style={s.carregamento}>
        <ActivityIndicator
          size="large"
          color={tema.azul}
        />
        <Text style={s.carregamentoTexto}>
          Carregando Estoque+...
        </Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {usuario ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'fade'
          }}
        >
          <Stack.Screen
            name="Inicio"
            component={PainelInicio}
          />

          <Stack.Screen
            name="Produtos"
            component={Moldura}
          />

          <Stack.Screen
            name="Alertas"
            component={Moldura}
          />

          <Stack.Screen
            name="Sobre"
            component={Moldura}
          />

          {usuario.perfil === 'gerente' ? (
            <Stack.Screen
              name="Cadastro"
              component={Cadastro}
            />
          ) : null}
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'fade'
          }}
        >
          <Stack.Screen
            name="Login"
            component={Login}
          />

          <Stack.Screen
            name="Cadastro"
            component={Cadastro}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={tema.fundo}
        />

        <Navegacao />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const s = StyleSheet.create({
  areaSegura: {
    flex: 1,
    backgroundColor: tema.fundo
  },

  conteudo: {
    flex: 1
  },

  faixaUsuario: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: tema.branco,
    borderBottomWidth: 1,
    borderBottomColor: tema.borda,
    gap: 8
  },

  nomeUsuario: {
    fontSize: 13,
    fontWeight: '800',
    color: tema.texto
  },

  perfil: {
    fontSize: 11,
    color: tema.secundario,
    marginTop: 3
  },

  botaoUsuario: {
    padding: 9,
    borderRadius: 9,
    backgroundColor: tema.azulClaro
  },

  botaoUsuarioTexto: {
    color: tema.azul,
    fontWeight: '700',
    fontSize: 11
  },

  botaoSair: {
    padding: 9
  },

  sairTexto: {
    color: tema.vermelho,
    fontWeight: '700'
  },

  carregamento: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: tema.fundo
  },

  carregamentoTexto: {
    color: tema.secundario,
    marginTop: 14
  }
});