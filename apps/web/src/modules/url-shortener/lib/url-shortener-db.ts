'use server';
import { IncrementShortenedURLClicks, StoreLinkPayload } from '@modules/url-shortener/types/url-shortener.types';
import { prisma } from '@modules/database/lib/database.lib';
import { setLinkInRedis } from '@modules/redis/lib/redis.lib';

export const getLinkFromDatabase = async (payload: { alias: string }) => {
  const link = await prisma.link.findUnique({
    where: { alias: payload.alias },
  });

  if (!link) throw new Error('Could not create shortened URL!');

  return link;
};

export const storeLinkInDatabase = async (payload: StoreLinkPayload) => {
  const link = await prisma.link.create({
    data: {
      url: payload.url,
      alias: payload.alias,
      expiresAt: payload.expiresAt,
      password: payload.password,
      user: payload.userEmail ? { connect: { email: payload.userEmail } } : undefined,
    },
  });

  if (!link) throw new Error('Could not create shortened URL!');

  await setLinkInRedis({ link });

  return link;
};

export const incrementShortenedURLClicks = async (payload: IncrementShortenedURLClicks) => {
  await prisma.link.update({ where: { alias: payload.alias }, data: { clicks: { increment: 1 } } });
};

export const getTotalLinksShortened = async () => {
  return await prisma.link.count();
};

export const getTotalActiveUsers = async () => {
  return await prisma.user.count();
};

export const getTotalLinksClicked = async () => {
  const result = await prisma.link.aggregate({ _sum: { clicks: true } });
  return result._sum.clicks ?? 0;
};

export const getAllLinks = async () => {
  return await prisma.link.findMany();
};
