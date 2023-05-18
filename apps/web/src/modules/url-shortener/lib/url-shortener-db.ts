'use server';
import {
  IncrementShortenedURLClicks,
  OriginalUrlFromAliasPayload,
  RetrieveShortenedURLPayload,
  StoreShortenedURLPayload,
} from '@modules/url-shortener/types/url-shortener.types';
import { prisma } from '@modules/database/lib/database.lib';
import { Redis } from '@upstash/redis';
import { Link } from '@prisma/client';
import { cache } from 'react';

const redis = new Redis({ url: process.env.UPSTASH_REDIS_REST_URL!, token: process.env.UPSTASH_REDIS_REST_TOKEN! });

export const storeShortenedURL = async (payload: StoreShortenedURLPayload) => {
  const link = await prisma.link.create({
    data: {
      url: payload.url,
      alias: payload.alias,
      expiresAt: payload.expiresAt,
      user: payload.userEmail ? { connect: { email: payload.userEmail } } : undefined,
    },
  });

  if (!link) throw new Error('Could not create shortened URL!');

  await redis.set(link.alias, link.url);

  return link;
};

export const updateLinkInRedisStore = async (payload: { link: Link }) => {
  const { link } = payload;
  await redis.set(link.alias, link.url);
};

export const getOriginalUrlFromAlias = cache(async (payload: OriginalUrlFromAliasPayload) => {
  const url: string | null = await redis.get(payload.alias);

  if (!url) throw new Error(`Could not find URL with alias '${payload.alias}'!`);

  return url;
});

export const getLinkFromAlias = cache(async (payload: RetrieveShortenedURLPayload) => {
  const link = await prisma.link.findFirst({
    where: {
      alias: payload.alias,
    },
  });

  if (!link) throw new Error(`Could not find shortened URL with alias '${payload.alias}'!`);

  return link;
});

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
