import React, { useCallback, useState } from 'react';

import {
  ScrollView,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import {
  Cabecalho,
  AvisoCard
} from '../components/Bloco';

import { tema } from '../components/tema';

import { listarProdutos } from '../services/api';

import { prepararProduto } from '../utils/produtos';

export default function Alertas() {
  const [produtos, setProdutos] = useState([]);

  const [carregando, setCarregando] = useState(true);

  const [erro, setErro] = useState('');

  // Buscar produtos quando entrar na tela
  useFocusEffect(
    useCallback(() => {
      let ativo = true;

      async function carregarAlertas() {
        setCarregando(true);
        setErro('');

        try {
          const dados = await listarProdutos();

          const preparados = dados.map(
            prepararProduto
          );

          if (ativo) {
            setProdutos(preparados);
          }

        } catch (erro) {
          if (ativo) {
            setErro(erro.message);
          }

        } finally {
          if (ativo) {
            setCarregando(false);
          }
        }
      }

      carregarAlertas();

      return () => {
        ativo = false;
      };
    }, [])
  );

  // Produtos próximos ou após o vencimento
  const alertasValidade = produtos.filter(
    (produto) =>
      produto.status.includes('validade')
  );

  // Produtos com quantidade baixa
  const alertasEstoque = produtos.filter(
    (produto) =>
      produto.status.includes('baixo')
  );

  return (
    <ScrollView
      contentContainerStyle={styles.conteudo}
    >
      <Cabecalho
        etiqueta="ACOMPANHAMENTO"
        titulo="Alertas"
        descricao="Acompanhe produtos com validade próxima ou estoque baixo."
      />

      {carregando ? (
        <ActivityIndicator
          size="large"
          color={tema.azul}
        />
      ) : null}

      {erro ? (
        <Text style={styles.erro}>
          {erro}
        </Text>
      ) : null}

      {/* Alertas de validade */}
      <Text style={styles.tituloSecao}>
        Atenção à validade
      </Text>

      {!carregando && alertasValidade.length === 0 ? (
        <Text style={styles.textoVazio}>
          Nenhum produto próximo ou após o vencimento.
        </Text>
      ) : (
        alertasValidade.map((produto) => (
          <AvisoCard
            key={`validade-${produto.id}`}
            titulo="Validade próxima ou vencida"
            produto={produto.nome}
            detalhe="Data de validade"
            valor={produto.validade}
            tipo="validade"
          />
        ))
      )}

      {/* Alertas de estoque */}
      <Text style={styles.tituloSecao}>
        Estoque baixo
      </Text>

      {!carregando && alertasEstoque.length === 0 ? (
        <Text style={styles.textoVazio}>
          Nenhum produto com estoque baixo.
        </Text>
      ) : (
        alertasEstoque.map((produto) => (
          <AvisoCard
            key={`estoque-${produto.id}`}
            titulo="Estoque baixo"
            produto={produto.nome}
            detalhe="Quantidade disponível"
            valor={`${produto.quantidade} ${produto.unidade}`}
            tipo="baixo"
          />
        ))
      )}

      <Text style={styles.observacao}>
        Os alertas são calculados a partir dos
        produtos cadastrados no banco de dados.
        Consideramos validade próxima quando
        faltam até 7 dias para o vencimento.
      </Text>
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

  tituloSecao: {
    fontSize: 18,
    fontWeight: '800',
    color: tema.texto,
    marginBottom: 13,
    marginTop: 12
  },

  textoVazio: {
    fontSize: 13,
    color: tema.secundario,
    marginBottom: 15
  },

  erro: {
    color: tema.vermelho,
    marginBottom: 10
  },

  observacao: {
    fontSize: 12,
    color: tema.secundario,
    lineHeight: 20,
    marginTop: 13
  }
});