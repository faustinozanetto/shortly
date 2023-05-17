export type UserDashboardPayload = {
  userEmail: string;
};

export type UserDashboardStatsData = {
  totalLinks: number;
  totalClicks: number;
  cplRate: number;
};

export type DeleteUserLinkPayload = {
  userEmail: string;
  linkId: string;
};
