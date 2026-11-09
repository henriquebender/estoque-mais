import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  configurarToken,
  fazerLogin,
  consultarPerfil
} from '../services/api';

const AuthContext = createContext(null);

const CHAVE_TOKEN = '@estoque_mais_token';

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  async function limparSessao() {
    configurarToken(null);
    setUsuario(null);
    await AsyncStorage.removeItem(CHAVE_TOKEN);
  }

  useEffect(() => {
    let ativo = true;

    async function restaurarSessao() {
      try {
        const token = await AsyncStorage.getItem(
          CHAVE_TOKEN
        );

        if (token) {
          configurarToken(token);

          const perfil = await consultarPerfil();

          if (ativo) {
            setUsuario(perfil);
          }
        }
      } catch (erro) {
        if (erro.status === 401) {
          await limparSessao();
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    restaurarSessao();

    return () => {
      ativo = false;
    };
  }, []);

  async function entrar(email, senha) {
    const resultado = await fazerLogin(email, senha);

    configurarToken(resultado.token);

    try {
      await AsyncStorage.setItem(
        CHAVE_TOKEN,
        resultado.token
      );

      setUsuario(resultado.usuario);
    } catch (erro) {
      configurarToken(null);
      throw new Error('Não foi possível salvar a sessão.');
    }
  }

  async function sair() {
    await limparSessao();
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        carregando,
        entrar,
        sair
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const contexto = useContext(AuthContext);

  if (!contexto) {
    throw new Error(
      'useAuth deve ser utilizado dentro de AuthProvider.'
    );
  }

  return contexto;
}