import { useContext } from 'react';
import { ThemeContext } from '../context/theme-context';

/**
 * Hook for accessing the theme context.
 * @returns The theme context.
 */
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('Tried to use ThemeContext with no context avaiable!');
  return context;
};
