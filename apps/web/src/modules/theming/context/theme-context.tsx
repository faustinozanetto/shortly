'use client';
import React, { createContext, useEffect, useState } from 'react';
import { ThemeContextState, ThemeType } from '../types/theming.types';

const initialState: ThemeContextState = {
  theme: 'dark',
  toggle: () => {},
};

export const ThemeContext = createContext<ThemeContextState>(initialState);

type ThemeProviderProps = {
  children: React.ReactNode;
};

const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
  const { children } = props;
  const [theme, setTheme] = useState<ThemeType>(initialState.theme);

  const updateLocalItem = (appliedTheme: ThemeType) => {
    window.localStorage.setItem('theme', appliedTheme);
  };

  const updateBodyClasses = (appliedTheme: ThemeType) => {
    if (appliedTheme === 'light') document.body.classList.remove('dark');
    else document.body.classList.add('dark');
  };

  useEffect(() => {
    const localTheme = (window.localStorage.getItem('theme') as ThemeType) || initialState.theme;
    if (localTheme) {
      setTheme(localTheme);
      updateLocalItem(localTheme);
      updateBodyClasses(localTheme);
    }
  }, []);

  const toggle = () => {
    setTheme((prev) => {
      const newTheme: ThemeType = prev === 'dark' ? 'light' : 'dark';
      updateLocalItem(newTheme);
      updateBodyClasses(newTheme);
      return newTheme;
    });
  };

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
