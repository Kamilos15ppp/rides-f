import React from 'react';
import axios from 'axios';
import { message } from 'antd';

const AuthContext = React.createContext({});

const url = 'https://przejazdy-api.you2.pl/api';
// const url = 'http://localhost:8000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const getUser = async (token) => {
    try {
      const response = await axios.get(`${url}/user`, {
        headers: {
          accept: 'application/json',
          authorization: `Bearer ${token}`,
        },
      });
      setIsLoading(false);
      setUser(response.data);
    } catch (e) {
      message.error('Wystąpił błąd, spróbuj ponownie później');
    }
  };

  React.useEffect(() => {
    const token = localStorage.getItem('przejazdykm_token');

    if (token) {
      getUser(token);
    } else {
      setIsLoading(true);
    }
  }, []);

  const signIn = async ({ email, password }) => {
    try {
      const response = await axios.post(
        `${url}/login`,
        {
          email,
          password,
        },
        {
          headers: {
            accept: 'application/json',
          },
        }
      );
      message.success('Zalogowano poprawnie');
      setIsLoading(false);
      // setUser(response.data);
      localStorage.setItem('przejazdykm_token', response.data.token);
      const token = response.data.token;
      if (token) {
        await getUser(token);
      }
      return true;
    } catch (e) {
      message.error('Niepoprawny email lub hasło');
      return false;
    }
  };

  const signOut = async () => {
    const token = localStorage.getItem('przejazdykm_token');
    if (token) {
      message.loading({ content: 'Trwa wylogowywanie...', key: 'logout' });
      try {
        await axios.post(
          `${url}/logout`,
          {},
          {
            headers: {
              accept: 'application/json',
              authorization: `Bearer ${token}`,
            },
          }
        );
        message.success({ content: 'Wylogowano poprawnie', key: 'logout' });
        setUser(null);
        localStorage.removeItem('przejazdykm_token');
        window.location.reload(false);
      } catch (e) {
        message.error('Błąd podczas wylogowywania');
      }
    }
  };

  const changePassword = async ({
    old_password,
    password,
    password_confirmation,
    email,
  }) => {
    const token = localStorage.getItem('przejazdykm_token');

    if (token) {
      message.loading({ content: 'Trwa zmiana hasła...', key: 'change' });
      try {
        const response = await axios.post(
          `${url}/change-password`,
          { old_password, password, password_confirmation, email },
          {
            headers: {
              accept: 'application/json',
              authorization: `Bearer ${token}`,
            },
          }
        );
        message.success({ content: response.data.message, key: 'change' });
        return response;
      } catch (e) {
        message.error('Wprowadź poprawne dane');
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, signIn, signOut, changePassword, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = React.useContext(AuthContext);

  if (!auth) {
    throw Error('useAuth needs to be used inside AuthContext');
  }

  return auth;
};
