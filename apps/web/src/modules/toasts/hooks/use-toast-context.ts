import { useContext } from 'react';
import { ToastContext } from '@modules/toasts/context/toasts-context';

/**
 * Hook that returns the toast context.
 * @returns The context if valid.
 */
export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('Tried to use ThemeContext with no context avaiable!');
  return context;
};
