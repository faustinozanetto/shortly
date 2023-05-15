import { Session } from 'next-auth';

export type UserTotalLinksPayload = {
  userId: string;
};

export type UserDashboardStatsData = {
  totalLinks: number;
};
