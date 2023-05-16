import { prisma } from '@modules/database/lib/database.lib';
import { DeleteUserLinkPayload, UserDashboardPayload } from '../types/dashboard.types';

export const getUserTotalLinks = async (payload: UserDashboardPayload) => {
  return await prisma.link.count({ where: { userId: payload.userId } });
};

export const getUserTotalLinkClicks = async (payload: UserDashboardPayload) => {
  const result = await prisma.link.aggregate({ _sum: { clicks: true }, where: { userId: payload.userId } });
  return result._sum.clicks ?? 0;
};

export const getUserLinks = async (payload: UserDashboardPayload) => {
  const links = await prisma.link.findMany({ where: { userId: payload.userId }, orderBy: { createdAt: 'asc' } });

  return links;
};
