'use client';
import { Link } from '@prisma/client';
import React, { useState } from 'react';

type UserDashboardLinkContext = {
  link: Link | null;
  setLink: (link: Link) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

const initialState: UserDashboardLinkContext = {
  link: null,
  setLink: () => {},
  loading: true,
  setLoading: () => {},
};

export const UserDashboardLinkContext = React.createContext<UserDashboardLinkContext>(initialState);

type UserDashboardLinkProviderProps = {
  children: React.ReactNode;
};

const UserDashboardLinkProvider: React.FC<UserDashboardLinkProviderProps> = (props) => {
  const { children } = props;

  const [link, setLink] = useState<Link | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <UserDashboardLinkContext.Provider value={{ link, setLink, loading, setLoading }}>
      {children}
    </UserDashboardLinkContext.Provider>
  );
};

export default UserDashboardLinkProvider;
