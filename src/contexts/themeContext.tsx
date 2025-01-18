import React, { useContext, useEffect, useState } from 'react';

import { IComponentProps, IResponseData, IThemeContext } from 'interfaces';
import { AuthContext } from './authContext';
import { UserService } from 'services';

export const ThemeContext = React.createContext<IThemeContext>({
  theme: '',
  toggleTheme: () => {},
});

export const ThemeContextProvider: React.FC<IComponentProps> = ({ children }) => {
  const auth = useContext(AuthContext);

  const [theme, setTheme] = useState<string>('');

  useEffect(() => {
    const getUserTheme = async () => {
      const response: IResponseData = await UserService.getUserTheme();
      if (response) {
        const { data, status, message } = response;

        if (status === 200) {
          setTheme(data['meta_value']);
        }
      }
    };

    if (auth.user.id) {
      getUserTheme();
    } else {
      setTheme('light');
    }
  }, [auth.user]);

  const toggleTheme = (newTheme: string) => {
    setTheme(newTheme);
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
