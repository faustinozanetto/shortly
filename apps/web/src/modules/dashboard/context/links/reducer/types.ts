import { Link } from '@prisma/client';

export type ActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type UserDashboardLinksFilterBy = {
  type: 'alias';
  value: string;
};

export type UserDashboardLinksSortBy = 'none' | 'alias' | 'createdAt';

export type UserDashboardLinksState = {
  isLoading: boolean;
  links: Link[];
  filteredLinks: Link[];
  filterBy: UserDashboardLinksFilterBy;
  sortBy: UserDashboardLinksSortBy;
};

export type UserDashboardLinksContextState = {
  state: UserDashboardLinksState;
  dispatch: React.Dispatch<UserDashboardLinksActions>;
};

export enum UserDashboardLinksType {
  SET_IS_LOADING,
  SET_LINKS,
  SET_FILTER_BY,
  SET_SORT_BY,
}

type UserDashboardLinksPayload = {
  [UserDashboardLinksType.SET_IS_LOADING]: {
    isLoading: boolean;
  };
  [UserDashboardLinksType.SET_LINKS]: {
    links: Link[];
  };
  [UserDashboardLinksType.SET_FILTER_BY]: {
    filterBy: UserDashboardLinksFilterBy;
  };
  [UserDashboardLinksType.SET_SORT_BY]: {
    sortBy: UserDashboardLinksSortBy;
  };
};

export type UserDashboardLinksActions =
  ActionMap<UserDashboardLinksPayload>[keyof ActionMap<UserDashboardLinksPayload>];
