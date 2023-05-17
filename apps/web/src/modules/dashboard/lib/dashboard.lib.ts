import { prisma } from '@modules/database/lib/database.lib';
import { UserDashboardPayload } from '../types/dashboard.types';

export const getUserTotalLinks = async (payload: UserDashboardPayload) => {
  return await prisma.link.count({ where: { user: { email: payload.userEmail } } });
};

export const getUserTotalLinkClicks = async (payload: UserDashboardPayload) => {
  const result = await prisma.link.aggregate({ _sum: { clicks: true }, where: { user: { email: payload.userEmail } } });
  return result._sum.clicks ?? 0;
};

export const getUserLinks = async (payload: UserDashboardPayload) => {
  const links = await prisma.link.findMany({
    where: { user: { email: payload.userEmail } },
    orderBy: { createdAt: 'asc' },
  });

  return links;
};
