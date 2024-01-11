import { Link } from '@prisma/client';
import { create } from 'zustand';

export type UserDashboardLinksFilterBy = {
  type: 'alias';
  value: string;
};

export type UserDashboardLinksSortBy = 'none' | 'alias' | 'createdAt';

export type UserDashboardLinkSliceState = {
  isLoading: boolean;
  links: Link[];
  filterBy: UserDashboardLinksFilterBy;
  sortBy: UserDashboardLinksSortBy;
};

export type UserDashboardLinkSliceActions = {
  setLinks: (links: Link[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setSortBy: (sortBy: UserDashboardLinksSortBy) => void;
  setFilterBy: (filterBy: UserDashboardLinksFilterBy) => void;
  getFilteredLinks: () => Link[];
};

export const useUserDashboardLinksStore = create<UserDashboardLinkSliceState & UserDashboardLinkSliceActions>(
  (set, get) => ({
    isLoading: true,
    links: [],
    sortBy: 'createdAt',
    filterBy: { type: 'alias', value: '' },
    setLinks(links) {
      set({ links });
    },
    setIsLoading(isLoading) {
      set({ isLoading });
    },
    setSortBy(sortBy) {
      set({ sortBy });
    },
    setFilterBy(filterBy) {
      set({ filterBy });
    },
    getFilteredLinks: () => {
      const filteredLinks = [...get().links].filter((link) => link[get().filterBy.type].includes(get().filterBy.value));
      let sortedLinks = [...filteredLinks];
      if (get().sortBy !== 'none')
        sortedLinks = [...filteredLinks].sort((a, b) => (a[get().sortBy] > b[get().sortBy] ? -1 : 1));
      return sortedLinks;
    },
  })
);
