import { Link } from '@prisma/client';
import { create } from 'zustand';

export type UserDashboardLinkSliceState = {
  link: Link | null;
  isLloading: boolean;
};

export type UserDashboardLinkSliceActions = {
  setLink: (link: Link) => void;
  setIsLoading: (isLloading: boolean) => void;
};

export const useUserDashboardLinkStore = create<UserDashboardLinkSliceState & UserDashboardLinkSliceActions>((set) => ({
  link: null,
  isLloading: true,
  setLink(link) {
    set({ link });
  },
  setIsLoading(isLloading) {
    set({ isLloading });
  },
}));
