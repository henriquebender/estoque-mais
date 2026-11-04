import React, { useCallback, useState } from 'react';

import {
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import {
  Cabecalho,
  ProdutoCard,
  Etiqueta,
  Cartao
} from '../components/Bloco';

import { tema } from '../components/tema';

import {
  listarProdutos,
  cadastrarProduto
} from '../services/api';

import { prepararProduto } from '../utils/produtos';

const formularioInicial = {
  nome: '',
  categoria: '',
  quantidade: '',
  unidade: 'un.',
  validade: '',
  quantidade_minima: '5'
};

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);

  const [formulario, setFormulario] = useState(
    formularioInicial
  );

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');

  // Buscar produtos na API
  const carregarProdutos = useCallback(async () => {
    setCarregando(true);
    setErro('');

    try {
      const dados = await listarProdutos();

      const produtosPreparados = dados.map(
        prepararProduto
      );

      setProdutos(produtosPreparados);

    } catch (erro) {
      setErro(erro.message);

    } finally {
      setCarregando(false);
    }
  }, []);

  // Atualizar quando entrar na tela
  useFocusEffect(
    useCallback(() => {
      carregarProdutos();
    }, [carregarProdutos])
  );

  // Atualizar os campos do formulário
  function alterarCampo(campo, valor) {
    setFormulario((anterior) => ({
      ...anterior,
      [campo]: valor
    }));
  }

  // Cadastrar um produto
  async function salvarProduto() {
    if (
      !formulario.nome.trim() ||
      !formulario.categoria.trim() ||
      !formulario.quantidade.trim()
    ) {
      setErro(
        'Preencha nome, categoria e quantidade.'
      );
      return;
    }

    setSalvando(true);
    setErro('');
    setMensagem('');

    try {
      const novoProduto = {
        nome: formulario.nome,
        categoria: formulario.categoria,

        quantidade: Number(
          formulario.quantidade
        ),

        unidade: formulario.unidade,

        validade:
          formulario.validade.trim() || null,

        quantidade_minima: Number(
          formulario.quantidade_minima
        )
      };

      await cadastrarProduto(novoProduto);

      setFormulario({ ...formularioInicial });

      await carregarProdutos();

      setMensagem(
        'Produto cadastrado com sucesso!'
      );

    } catch (erro) {
      setErro(erro.message);

    } finally {
      setSalvando(false);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={styles.conteudo}
      keyboardShouldPersistTaps="handled"
    >
      <Cabecalho
        etiqueta="CONTROLE DE ESTOQUE"
        titulo="Produtos"
        descricao="Consulte e cadastre produtos do seu estoque."
      />

      {/* Resumo */}
      <Cartao style={styles.resumo}>
        <Text style={styles.numero}>
          {produtos.length}
        </Text>

        <View>
          <Text style={styles.resumoTitulo}>
            Produtos cadastrados
          </Text>

          <Text style={styles.resumoDescricao}>
            Informações carregadas do MySQL
          </Text>
        </View>
      </Cartao>

      {/* Formulário */}
      <Text style={styles.tituloSecao}>
        Cadastrar produto
      </Text>

      <Cartao>
        <TextInput
          style={styles.input}
          placeholder="Nome do produto"
          placeholderTextColor={tema.secundario}
          value={formulario.nome}
          onChangeText={(valor) =>
            alterarCampo('nome', valor)
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Categoria"
          placeholderTextColor={tema.secundario}
          value={formulario.categoria}
          onChangeText={(valor) =>
            alterarCampo('categoria', valor)
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Quantidade"
          placeholderTextColor={tema.secundario}
          keyboardType="numeric"
          value={formulario.quantidade}
          onChangeText={(valor) =>
            alterarCampo('quantidade', valor)
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Unidade (ex.: un.)"
          placeholderTextColor={tema.secundario}
          value={formulario.unidade}
          onChangeText={(valor) =>
            alterarCampo('unidade', valor)
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Validade (AAAA-MM-DD)"
          placeholderTextColor={tema.secundario}
          value={formulario.validade}
          onChangeText={(valor) =>
            alterarCampo('validade', valor)
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Quantidade mínima"
          placeholderTextColor={tema.secundario}
          keyboardType="numeric"
          value={formulario.quantidade_minima}
          onChangeText={(valor) =>
            alterarCampo('quantidade_minima', valor)
          }
        />

        <Pressable
          style={styles.botao}
          onPress={salvarProduto}
          disabled={salvando}
        >
          <Text style={styles.botaoTexto}>
            {salvando
              ? 'Salvando...'
              : 'Cadastrar produto'}
          </Text>
        </Pressable>

        <Text style={styles.ajuda}>
          Para a validade, utilize o formato
          AAAA-MM-DD. Exemplo: 2027-12-15.
        </Text>
      </Cartao>

      {/* Mensagens */}
      {erro ? (
        <Text style={styles.erro}>
          {erro}
        </Text>
      ) : null}

      {mensagem ? (
        <Text style={styles.sucesso}>
          {mensagem}
        </Text>
      ) : null}

      {/* Legenda */}
      <Text style={styles.tituloSecao}>
        Situação dos produtos
      </Text>

      <View style={styles.legenda}>
        <Etiqueta tipo="ok" />
        <Etiqueta tipo="validade" />
        <Etiqueta tipo="baixo" />
      </View>

      {/* Lista */}
      <Text style={styles.tituloSecao}>
        Lista de produtos
      </Text>

      {carregando ? (
        <ActivityIndicator
          size="large"
          color={tema.azul}
        />
      ) : produtos.length > 0 ? (
        produtos.map((produto) => (
          <ProdutoCard
            key={produto.id}
            produto={produto}
          />
        ))
      ) : (
        <Text style={styles.textoVazio}>
          Nenhum produto cadastrado.
        </Text>
      )}

      <Pressable
        onPress={carregarProdutos}
        style={styles.atualizar}
      >
        <Text style={styles.atualizarTexto}>
          Atualizar lista
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  conteudo: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 30,
    maxWidth: 520,
    width: '100%',
    alignSelf: 'center'
  },

  resumo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 17,
    backgroundColor: tema.azulClaro
  },

  numero: {
    fontSize: 37,
    fontWeight: '800',
    color: tema.azul
  },

  resumoTitulo: {
    fontSize: 15,
    fontWeight: '800',
    color: tema.texto
  },

  resumoDescricao: {
    fontSize: 12,
    color: tema.secundario,
    marginTop: 4
  },

  tituloSecao: {
    fontSize: 17,
    fontWeight: '800',
    color: tema.texto,
    marginTop: 15,
    marginBottom: 12
  },

  input: {
    borderWidth: 1,
    borderColor: tema.borda,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    backgroundColor: tema.branco,
    color: tema.texto
  },

  botao: {
    backgroundColor: tema.azul,
    padding: 15,
    borderRadius: 13,
    alignItems: 'center'
  },

  botaoTexto: {
    color: '#FFFFFF',
    fontWeight: '800'
  },

  ajuda: {
    fontSize: 11,
    color: tema.secundario,
    marginTop: 9
  },

  erro: {
    color: tema.vermelho,
    marginBottom: 10
  },

  sucesso: {
    color: tema.verde,
    marginBottom: 10
  },

  legenda: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
    marginBottom: 6
  },

  textoVazio: {
    color: tema.secundario,
    marginBottom: 14
  },

  atualizar: {
    alignItems: 'center',
    padding: 14
  },

  atualizarTexto: {
    color: tema.azul,
    fontWeight: '700'
  }
});