import React, { createContext, useReducer } from 'react';
import { reducer } from './reducer';
import { ToastContextState } from '@modules/toasts/types/toasts.types';

const initialState: ToastContextState = {
  state: { toasts: [] },
  dispatch: () => {},
};

export const ToastContext = createContext<ToastContextState>(initialState);

type ToastProviderProps = {
  children: React.ReactNode;
};

export const ToastProvider: React.FC<ToastProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, {
    toasts: [],
  });

  return <ToastContext.Provider value={{ state, dispatch }}>{children}</ToastContext.Provider>;
};
