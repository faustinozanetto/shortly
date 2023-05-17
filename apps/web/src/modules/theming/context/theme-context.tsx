'use client';
import React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

import { ThemeProviderProps as NextThemeProviderProps } from 'next-themes/dist/types';

type ThemeProviderProps = NextThemeProviderProps;

const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
  const { children, ...rest } = props;

  return <NextThemesProvider {...rest}>{children}</NextThemesProvider>;
};

export default ThemeProvider;
