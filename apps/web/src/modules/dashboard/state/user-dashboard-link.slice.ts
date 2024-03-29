import { AnalyticsCategoryType, LinkStatsResponse } from '@modules/analytics/types/analytics.types';
import { Link } from '@prisma/client';
import { create } from 'zustand';

export type UserDashboardLinkSliceState = {
  link: Link | null;
  isLoading: boolean;
  stats: Record<AnalyticsCategoryType, LinkStatsResponse<unknown>>;
  statsIsLoading: Record<AnalyticsCategoryType, boolean>;
};

export type UserDashboardLinkSliceActions = {
  setLink: (link: Link) => void;
  setIsLoading: (isLoading: boolean) => void;
  setStatsCategory: (category: AnalyticsCategoryType, stats: LinkStatsResponse<unknown>) => void;
  setStatsCategoryIsLoading: (category: AnalyticsCategoryType, isLoading: boolean) => void;
};

export const useUserDashboardLinkStore = create<UserDashboardLinkSliceState & UserDashboardLinkSliceActions>(
  (set, get) => ({
    link: null,
    isLoading: true,
    stats: { browser: [], country: [], device: [], os: [] },
    statsIsLoading: { browser: true, country: true, device: true, os: true },
    setLink(link) {
      set({ link });
    },
    setIsLoading(isLoading) {
      set({ isLoading });
    },
    setStatsCategory(category, stats) {
      let updatedStats = get().stats;
      updatedStats[category] = stats;
      set({ stats: updatedStats });
    },
    setStatsCategoryIsLoading(category, isLoading) {
      let updatedIsLoadingStats = get().statsIsLoading;
      updatedIsLoadingStats[category] = isLoading;
      set({ statsIsLoading: updatedIsLoadingStats });
    },
  })
);
