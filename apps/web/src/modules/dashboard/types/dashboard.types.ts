export type UserDashboardPayload = {
  userId: string;
};

export type UserDashboardStatsData = {
  totalLinks: number;
  totalClicks: number;
  cplRate: number;
};

export type DeleteUserLinkPayload = {
  userId: string;
  linkId: string;
};
