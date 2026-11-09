import React, {
  useCallback,
  useState
} from 'react';

import {
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Alert
} from 'react-native';

import {
  useFocusEffect
} from '@react-navigation/native';

import {
  Cabecalho,
  ProdutoCard,
  Cartao
} from '../components/Bloco';

import { tema } from '../components/tema';

import { useAuth } from '../context/AuthContext';

import {
  listarProdutos,
  cadastrarProduto,
  editarProduto,
  atualizarQuantidade,
  excluirProduto
} from '../services/api';

import {
  prepararProduto
} from '../utils/produtos';

const inicial = {
  nome: '',
  categoria: '',
  quantidade: '',
  unidade: 'un.',
  validade: '',
  quantidade_minima: '5'
};

export default function Produtos() {
  const { usuario } = useAuth();

  const gerente = usuario?.perfil === 'gerente';

  const [produtos, setProdutos] = useState([]);
  const [formulario, setFormulario] = useState({ ...inicial });

  const [editandoId, setEditandoId] = useState(null);
  const [quantidades, setQuantidades] = useState({});

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');

  const carregar = useCallback(async () => {
    setCarregando(true);
    setErro('');

    try {
      const dados = await listarProdutos();

      setProdutos(dados.map(prepararProduto));

      const valores = {};

      dados.forEach((produto) => {
        valores[produto.id] = String(produto.quantidade);
      });

      setQuantidades(valores);
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [carregar])
  );

  function alterar(campo, valor) {
    setFormulario((anterior) => ({
      ...anterior,
      [campo]: valor
    }));
  }

  function limpar() {
    setFormulario({ ...inicial });
    setEditandoId(null);
  }

  function iniciarEdicao(produto) {
    setEditandoId(produto.id);

    setFormulario({
      nome: produto.nome,
      categoria: produto.categoria,
      quantidade: String(produto.quantidade),
      unidade: produto.unidade,
      validade:
        produto.validade === 'Sem validade'
          ? ''
          : produto.validade.split('/').reverse().join('-'),
      quantidade_minima: String(produto.quantidade_minima)
    });

    setMensagem('');
    setErro('');
  }

  async function salvar() {
    setErro('');
    setMensagem('');

    if (
      !formulario.nome.trim() ||
      !formulario.categoria.trim() ||
      !formulario.quantidade.trim() ||
      !formulario.quantidade_minima.trim() ||
      !formulario.unidade.trim()
    ) {
      setErro('Preencha os campos obrigatórios.');
      return;
    }

    const quantidade = Number(formulario.quantidade);
    const minima = Number(formulario.quantidade_minima);

    if (
      !Number.isInteger(quantidade) ||
      quantidade < 0 ||
      !Number.isInteger(minima) ||
      minima < 0
    ) {
      setErro('Informe quantidades inteiras e não negativas.');
      return;
    }

    const dados = {
      nome: formulario.nome,
      categoria: formulario.categoria,
      quantidade,
      unidade: formulario.unidade,
      validade: formulario.validade.trim() || null,
      quantidade_minima: minima
    };

    setSalvando(true);

    try {
      if (editandoId !== null) {
        await editarProduto(editandoId, dados);

        setMensagem('Produto atualizado com sucesso!');
      } else {
        await cadastrarProduto(dados);

        setMensagem('Produto cadastrado com sucesso!');
      }

      limpar();
      await carregar();

    } catch (e) {
      setErro(e.message);
    } finally {
      setSalvando(false);
    }
  }

  async function salvarQuantidade(produto) {
    setErro('');
    setMensagem('');

    const quantidade = Number(quantidades[produto.id]);

    if (
      quantidades[produto.id] === '' ||
      !Number.isInteger(quantidade) ||
      quantidade < 0
    ) {
      setErro('Informe uma quantidade inteira válida.');
      return;
    }

    try {
      await atualizarQuantidade(produto.id, quantidade);

      setMensagem(
        `Quantidade de ${produto.nome} atualizada!`
      );

      await carregar();

    } catch (e) {
      setErro(e.message);
    }
  }

  function confirmarExclusao(produto) {
    const executar = async () => {
      try {
        setErro('');
        setMensagem('');

        await excluirProduto(produto.id);

        if (editandoId === produto.id) {
          limpar();
        }

        setMensagem('Produto excluído com sucesso!');

        await carregar();

      } catch (e) {
        setErro(e.message);
      }
    };

    // No navegador, Alert.alert pode não apresentar
    // a mesma caixa de confirmação do aplicativo nativo.
    if (typeof window !== 'undefined') {
      if (window.confirm(`Excluir ${produto.nome}?`)) {
        executar();
      }

      return;
    }

    Alert.alert(
      'Excluir produto',
      `Deseja excluir ${produto.nome}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: executar
        }
      ]
    );
  }

  return (
    <ScrollView
      contentContainerStyle={s.conteudo}
      keyboardShouldPersistTaps="handled"
    >
      <Cabecalho
        etiqueta="GESTÃO COMERCIAL"
        titulo="Produtos"
        descricao={
          gerente
            ? 'Gerencie os produtos do seu estoque.'
            : 'Consulte produtos e atualize quantidades.'
        }
      />

      <Cartao style={s.resumo}>
        <Text style={s.numero}>
          {produtos.length}
        </Text>

        <View style={{ flex: 1 }}>
          <Text style={s.resumoTitulo}>
            Produtos cadastrados
          </Text>

          <Text style={s.resumoDescricao}>
            Dados armazenados no MySQL
          </Text>
        </View>
      </Cartao>

      {gerente ? (
        <>
          <Text style={s.secao}>
            {editandoId !== null
              ? 'Editar produto'
              : 'Cadastrar produto'}
          </Text>

          <Cartao>
            <TextInput
              style={s.input}
              placeholder="Nome do produto"
              value={formulario.nome}
              onChangeText={(v) => alterar('nome', v)}
            />

            <TextInput
              style={s.input}
              placeholder="Categoria"
              value={formulario.categoria}
              onChangeText={(v) => alterar('categoria', v)}
            />

            <TextInput
              style={s.input}
              placeholder="Quantidade"
              keyboardType="numeric"
              value={formulario.quantidade}
              onChangeText={(v) => alterar('quantidade', v)}
            />

            <TextInput
              style={s.input}
              placeholder="Unidade (un., kg, L...)"
              value={formulario.unidade}
              onChangeText={(v) => alterar('unidade', v)}
            />

            <TextInput
              style={s.input}
              placeholder="Validade AAAA-MM-DD"
              value={formulario.validade}
              onChangeText={(v) => alterar('validade', v)}
            />

            <TextInput
              style={s.input}
              placeholder="Quantidade mínima"
              keyboardType="numeric"
              value={formulario.quantidade_minima}
              onChangeText={(v) =>
                alterar('quantidade_minima', v)
              }
            />

            <Pressable
              style={s.botao}
              onPress={salvar}
              disabled={salvando}
            >
              <Text style={s.botaoTexto}>
                {salvando
                  ? 'Salvando...'
                  : editandoId !== null
                    ? 'Salvar alterações'
                    : 'Cadastrar produto'}
              </Text>
            </Pressable>

            {editandoId !== null ? (
              <Pressable
                style={s.botaoSecundario}
                onPress={limpar}
              >
                <Text style={s.botaoSecundarioTexto}>
                  Cancelar edição
                </Text>
              </Pressable>
            ) : null}
          </Cartao>
        </>
      ) : (
        <Cartao style={s.aviso}>
          <Text style={s.avisoTexto}>
            Perfil funcionário: você pode consultar
            produtos e atualizar quantidades.
          </Text>
        </Cartao>
      )}

      {erro ? (
        <Text style={s.erro}>{erro}</Text>
      ) : null}

      {mensagem ? (
        <Text style={s.sucesso}>{mensagem}</Text>
      ) : null}

      <Text style={s.secao}>
        Lista de produtos
      </Text>

      {carregando ? (
        <ActivityIndicator
          size="large"
          color={tema.azul}
        />
      ) : produtos.length === 0 ? (
        <Text style={s.vazio}>
          Nenhum produto cadastrado.
        </Text>
      ) : (
        produtos.map((produto) => (
          <View key={produto.id}>
            <ProdutoCard produto={produto} />

            <Cartao style={s.acoes}>
              <Text style={s.rotulo}>
                Atualizar quantidade
              </Text>

              <View style={s.linha}>
                <TextInput
                  style={[s.input, s.campoQuantidade]}
                  keyboardType="numeric"
                  value={quantidades[produto.id] ?? ''}
                  onChangeText={(valor) =>
                    setQuantidades((anterior) => ({
                      ...anterior,
                      [produto.id]: valor
                    }))
                  }
                />

                <Pressable
                  style={s.botaoPequeno}
                  onPress={() => salvarQuantidade(produto)}
                >
                  <Text style={s.botaoTexto}>
                    Atualizar
                  </Text>
                </Pressable>
              </View>

              {gerente ? (
                <View style={s.linha}>
                  <Pressable
                    style={s.editar}
                    onPress={() => iniciarEdicao(produto)}
                  >
                    <Text style={s.editarTexto}>
                      Editar produto
                    </Text>
                  </Pressable>

                  <Pressable
                    style={s.excluir}
                    onPress={() => confirmarExclusao(produto)}
                  >
                    <Text style={s.excluirTexto}>
                      Excluir
                    </Text>
                  </Pressable>
                </View>
              ) : null}
            </Cartao>
          </View>
        ))
      )}

      <Pressable
        style={s.atualizarLista}
        onPress={carregar}
      >
        <Text style={s.atualizarTexto}>
          Atualizar lista
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const s = StyleSheet.create({
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
    gap: 16,
    backgroundColor: tema.azulClaro
  },

  numero: {
    fontSize: 35,
    fontWeight: '800',
    color: tema.azul
  },

  resumoTitulo: {
    fontSize: 15,
    fontWeight: '800',
    color: tema.texto
  },

  resumoDescricao: {
    color: tema.secundario,
    fontSize: 12,
    marginTop: 4
  },

  secao: {
    fontSize: 18,
    fontWeight: '800',
    color: tema.texto,
    marginTop: 16,
    marginBottom: 12
  },

  input: {
    borderWidth: 1,
    borderColor: tema.borda,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    color: tema.texto,
    backgroundColor: tema.branco
  },

  botao: {
    backgroundColor: tema.azul,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center'
  },

  botaoTexto: {
    color: tema.branco,
    fontWeight: '800'
  },

  botaoSecundario: {
    padding: 14,
    alignItems: 'center'
  },

  botaoSecundarioTexto: {
    color: tema.azul,
    fontWeight: '700'
  },

  aviso: {
    backgroundColor: tema.azulClaro
  },

  avisoTexto: {
    color: tema.azulEscuro,
    lineHeight: 20
  },

  erro: {
    color: tema.vermelho,
    marginBottom: 10
  },

  sucesso: {
    color: tema.verde,
    marginBottom: 10
  },

  vazio: {
    color: tema.secundario
  },

  acoes: {
    marginTop: -3,
    paddingTop: 12
  },

  rotulo: {
    color: tema.secundario,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8
  },

  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9
  },

  campoQuantidade: {
    flex: 1,
    marginBottom: 0
  },

  botaoPequeno: {
    backgroundColor: tema.azul,
    borderRadius: 10,
    padding: 13
  },

  editar: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    backgroundColor: tema.azulClaro,
    alignItems: 'center',
    marginTop: 12
  },

  editarTexto: {
    color: tema.azul,
    fontWeight: '700'
  },

  excluir: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: tema.vermelhoClaro,
    marginTop: 12
  },

  excluirTexto: {
    color: tema.vermelho,
    fontWeight: '700'
  },

  atualizarLista: {
    padding: 16,
    alignItems: 'center'
  },

  atualizarTexto: {
    color: tema.azul,
    fontWeight: '700'
  }
});