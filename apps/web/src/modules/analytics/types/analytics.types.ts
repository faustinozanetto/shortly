import { ANALYTICS_CATEGORIES } from '../lib/analytics.constants';

export type AnalyticsCategoryType = (typeof ANALYTICS_CATEGORIES)[number];

export type LinkStatEntry<T> = { entry: T; count: number };

export type LinkStatsResponse<T> = LinkStatEntry<T>[];
