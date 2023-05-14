'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

export type AuthContextProps = {
  children: React.ReactNode;
  session: Session;
};

const AuthContext: React.FC<AuthContextProps> = (props) => {
  const { children } = props;
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthContext;
