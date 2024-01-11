import { AnalyticsCategoryType, LinkStatsResponse } from '@modules/analytics/types/analytics.types';
import { Link } from '@prisma/client';
import { create } from 'zustand';

export type UserDashboardLinkSliceState = {
  link: Link | null;
  isLloading: boolean;
  stats: Record<AnalyticsCategoryType, LinkStatsResponse<unknown>>;
};

export type UserDashboardLinkSliceActions = {
  setLink: (link: Link) => void;
  setIsLoading: (isLloading: boolean) => void;
  setStatsCategory: (category: AnalyticsCategoryType, stats: LinkStatsResponse<unknown>) => void;
};

export const useUserDashboardLinkStore = create<UserDashboardLinkSliceState & UserDashboardLinkSliceActions>(
  (set, get) => ({
    link: null,
    isLloading: true,
    stats: { browser: [], country: [], device: [], os: [] },
    setLink(link) {
      set({ link });
    },
    setIsLoading(isLloading) {
      set({ isLloading });
    },
    setStatsCategory(category, stats) {
      let updatedStats = get().stats;
      updatedStats[category] = stats;
      set({ stats: updatedStats });
    },
  })
);
