'use client';
import React, { useMemo, useReducer } from 'react';
import { UserDashboardLinksContextState } from './reducer/types';
import { reducer } from './reducer';

const initialState: UserDashboardLinksContextState = {
  state: { links: [], filteredLinks: [], sortBy: 'createdAt', filterBy: { type: 'alias', value: '' } },
  dispatch: () => {},
};

export const UserDashboardLinksContext = React.createContext<UserDashboardLinksContextState>(initialState);

type UserDashboardLinkProviderProps = {
  children: React.ReactNode;
};

const UserDashboardLinksProvider: React.FC<UserDashboardLinkProviderProps> = (props) => {
  const { children } = props;

  const [state, dispatch] = useReducer(reducer, { ...initialState.state });

  const filteredLinks = useMemo(() => {
    const filteredLinks = [...state.links].filter((link) => link[state.filterBy.type].includes(state.filterBy.value));
    let sortedLinks = [...filteredLinks];
    if (state.sortBy !== 'none')
      sortedLinks = [...filteredLinks].sort((a, b) => (a[state.sortBy] > b[state.sortBy] ? -1 : 1));
    return sortedLinks;
  }, [state.filterBy, state.sortBy, state.links]);

  return (
    <UserDashboardLinksContext.Provider value={{ state: { ...state, filteredLinks }, dispatch }}>
      {children}
    </UserDashboardLinksContext.Provider>
  );
};

export default UserDashboardLinksProvider;
