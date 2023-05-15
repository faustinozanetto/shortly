import { prisma } from '@modules/database/lib/database.lib';
import { UserTotalLinksPayload } from '../types/dashboard.types';

export const getUserTotalLinks = async (payload: UserTotalLinksPayload) => {
  return await prisma.link.count({ where: { userId: payload.userId } });
};
