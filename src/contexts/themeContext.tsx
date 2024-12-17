import React, { useState } from 'react';

import { IComponentProps, IThemeContext } from 'interfaces';

export const ThemeContext = React.createContext<IThemeContext>({
  theme: 'light',
  toggleTheme: () => {},
});

export const ThemeContextProvider: React.FC<IComponentProps> = ({ children }) => {
  const [theme, setTheme] = useState<string>('light');

  const toggleTheme = (newTheme: string) => {
    setTheme(newTheme);
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
