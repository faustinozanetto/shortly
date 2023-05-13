'use client';
import React, { createContext, useReducer } from 'react';

import { ToastContextState } from '@modules/toasts/types/toasts.types';
import { reducer } from '@modules/toasts/context/reducer';

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
