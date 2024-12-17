import React, { useEffect, useState } from 'react';

import { IAuthContext, IComponentProps } from 'interfaces';
import axios from 'axios';

export const AuthContext = React.createContext<IAuthContext>({
  user: {},
  setUser: () => {},
  isAuth: false,
  accessToken: '',
  setIsAuth: (newState: boolean) => {},
  setAccessToken: (newValute: string) => {},
});

export const AuthContextProvider: React.FC<IComponentProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<Object>({});
  const [accessToken, setAccessToken] = useState<string>('');

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('access-token');

    if (storedAccessToken) {
      if (!isAuth) {
        setIsAuth(true);
      }
      setAccessToken(storedAccessToken);
    }
  }, [isAuth]);

  useEffect(() => {
    const getUser = async () => {
      const data = await axios.get('/api/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUser(data.data);
    };

    if (accessToken) {
      getUser();
    }
  }, [accessToken]);

  return <AuthContext.Provider value={{ user, setUser, isAuth, setIsAuth, accessToken, setAccessToken }}>{children}</AuthContext.Provider>;
};
