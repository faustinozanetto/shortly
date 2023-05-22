export const analyticsTypes = ['country', 'browser', 'os', 'device'] as const;
export type AnalyticsDataType = (typeof analyticsTypes)[number];

export type LinkStatEntry<T> = { entry: T; count: number };

export type LinkStatsResponse<T> = LinkStatEntry<T>[];
