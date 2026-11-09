import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet
} from 'react-native';

import { useAuth } from '../context/AuthContext';
import { tema } from '../components/tema';

export default function Login({ navigation }) {
  const { entrar } = useAuth();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function acessar() {
    setErro('');

    if (!email.trim() || !senha) {
      setErro('Informe seu e-mail e senha.');
      return;
    }

    setCarregando(true);

    try {
      await entrar(email, senha);
    } catch (erro) {
      setErro(erro.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={s.conteudo}
      keyboardShouldPersistTaps="handled"
    >
      <View style={s.logo}>
        <Text style={s.logoTexto}>E+</Text>
      </View>

      <Text style={s.titulo}>Estoque+</Text>

      <Text style={s.subtitulo}>
        Gestão inteligente de estoque comercial
      </Text>

      <View style={s.cartao}>
        <Text style={s.cartaoTitulo}>
          Entrar na conta
        </Text>

        <Text style={s.rotulo}>E-mail</Text>

        <TextInput
          style={s.input}
          placeholder="seuemail@exemplo.com"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={s.rotulo}>Senha</Text>

        <TextInput
          style={s.input}
          placeholder="Digite sua senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        {erro ? (
          <Text style={s.erro}>{erro}</Text>
        ) : null}

        <Pressable
          style={s.botao}
          onPress={acessar}
          disabled={carregando}
        >
          <Text style={s.botaoTexto}>
            {carregando ? 'Entrando...' : 'Entrar'}
          </Text>
        </Pressable>
      </View>

      <Pressable
        onPress={() => navigation.navigate('Cadastro')}
      >
        <Text style={s.link}>
          Primeiro acesso? Cadastrar gerente
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  conteudo: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: tema.fundo
  },

  logo: {
    width: 76,
    height: 76,
    borderRadius: 23,
    backgroundColor: tema.azul,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  },

  logoTexto: {
    color: tema.branco,
    fontSize: 29,
    fontWeight: '900'
  },

  titulo: {
    fontSize: 32,
    fontWeight: '800',
    color: tema.texto
  },

  subtitulo: {
    color: tema.secundario,
    textAlign: 'center',
    marginTop: 7,
    marginBottom: 26
  },

  cartao: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: tema.branco,
    padding: 22,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: tema.borda
  },

  cartaoTitulo: {
    fontSize: 20,
    fontWeight: '800',
    color: tema.texto,
    marginBottom: 20
  },

  rotulo: {
    color: tema.texto,
    fontWeight: '700',
    marginBottom: 7
  },

  input: {
    borderWidth: 1,
    borderColor: tema.borda,
    borderRadius: 12,
    padding: 13,
    marginBottom: 16,
    color: tema.texto
  },

  botao: {
    backgroundColor: tema.azul,
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginTop: 6
  },

  botaoTexto: {
    color: tema.branco,
    fontWeight: '800'
  },

  erro: {
    color: tema.vermelho,
    marginBottom: 12
  },

  link: {
    marginTop: 22,
    color: tema.azul,
    fontWeight: '700'
  }
});