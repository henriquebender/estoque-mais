import React, { useState } from 'react';

import {
  ScrollView,
  Text,
  TextInput,
  Pressable,
  StyleSheet
} from 'react-native';

import { tema } from '../components/tema';

import { useAuth } from '../context/AuthContext';

import {
  cadastrarGerente,
  cadastrarFuncionario
} from '../services/api';

export default function Cadastro({ navigation }) {
  const { usuario } = useAuth();

  const gerenteLogado = usuario?.perfil === 'gerente';

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmacao, setConfirmacao] = useState('');

  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [salvando, setSalvando] = useState(false);

  async function salvar() {
    setErro('');
    setMensagem('');

    if (!nome.trim() || !email.trim() || !senha) {
      setErro('Preencha todos os campos.');
      return;
    }

    if (senha.length < 8) {
      setErro('A senha deve ter pelo menos 8 caracteres.');
      return;
    }

    if (senha !== confirmacao) {
      setErro('As senhas não coincidem.');
      return;
    }

    setSalvando(true);

    try {
      const dados = {
        nome: nome.trim(),
        email: email.trim(),
        senha
      };

      if (gerenteLogado) {
        await cadastrarFuncionario(dados);
      } else {
        await cadastrarGerente(dados);
      }

      setNome('');
      setEmail('');
      setSenha('');
      setConfirmacao('');

      setMensagem(
        gerenteLogado
          ? 'Funcionário cadastrado com sucesso!'
          : 'Gerente cadastrado! Volte e faça login.'
      );

    } catch (erro) {
      setErro(erro.message);

    } finally {
      setSalvando(false);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={s.conteudo}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={s.titulo}>
        {gerenteLogado
          ? 'Cadastrar funcionário'
          : 'Primeiro acesso'}
      </Text>

      <Text style={s.descricao}>
        {gerenteLogado
          ? 'Crie uma conta com permissões de funcionário.'
          : 'Cadastre o primeiro gerente do Estoque+.'}
      </Text>

      <Text style={s.rotulo}>Nome completo</Text>

      <TextInput
        style={s.input}
        placeholder="Nome do usuário"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={s.rotulo}>E-mail</Text>

      <TextInput
        style={s.input}
        placeholder="usuario@exemplo.com"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={s.rotulo}>Senha</Text>

      <TextInput
        style={s.input}
        placeholder="Mínimo de 8 caracteres"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <Text style={s.rotulo}>Confirmar senha</Text>

      <TextInput
        style={s.input}
        placeholder="Repita a senha"
        secureTextEntry
        value={confirmacao}
        onChangeText={setConfirmacao}
      />

      {erro ? (
        <Text style={s.erro}>{erro}</Text>
      ) : null}

      {mensagem ? (
        <Text style={s.sucesso}>{mensagem}</Text>
      ) : null}

      <Pressable
        style={s.botao}
        onPress={salvar}
        disabled={salvando}
      >
        <Text style={s.botaoTexto}>
          {salvando ? 'Salvando...' : 'Cadastrar'}
        </Text>
      </Pressable>

      <Pressable onPress={() => navigation.goBack()}>
        <Text style={s.voltar}>Voltar</Text>
      </Pressable>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  conteudo: {
    padding: 24,
    paddingTop: 40,
    paddingBottom: 50,
    maxWidth: 520,
    width: '100%',
    alignSelf: 'center'
  },

  titulo: {
    fontSize: 28,
    fontWeight: '800',
    color: tema.texto
  },

  descricao: {
    color: tema.secundario,
    marginTop: 8,
    marginBottom: 25,
    lineHeight: 21
  },

  rotulo: {
    fontWeight: '700',
    color: tema.texto,
    marginBottom: 7
  },

  input: {
    borderWidth: 1,
    borderColor: tema.borda,
    backgroundColor: tema.branco,
    padding: 13,
    borderRadius: 12,
    marginBottom: 16,
    color: tema.texto
  },

  botao: {
    backgroundColor: tema.azul,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center'
  },

  botaoTexto: {
    color: tema.branco,
    fontWeight: '800'
  },

  erro: {
    color: tema.vermelho,
    marginBottom: 12
  },

  sucesso: {
    color: tema.verde,
    marginBottom: 12
  },

  voltar: {
    color: tema.azul,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '700'
  }
});