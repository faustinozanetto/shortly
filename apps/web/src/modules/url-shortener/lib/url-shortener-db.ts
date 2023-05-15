'use server';
import {
  RetrieveShortenedURLPayload,
  StoreShortenedURLPayload,
} from '@modules/url-shortener/types/url-shortener.types';
import { prisma } from '@shortly/database';

export const storeShortenedURL = async (payload: StoreShortenedURLPayload) => {
  const link = await prisma.link.create({
    data: {
      url: payload.url,
      alias: payload.alias,
      userId: payload.userId,
    },
  });

  if (!link) throw new Error('Could not create shortened URL!');

  return link;
};

export const retrieveShortenedURL = async (payload: RetrieveShortenedURLPayload) => {
  const link = await prisma.link.findFirst({
    where: {
      alias: payload.alias,
    },
  });

  if (!link) throw new Error(`Could not find shortened URL with alias '${payload.alias}'!`);

  return link;
};

export const getTotalLinksShortened = async () => {
  return await prisma.link.count();
};

export const getTotalActiveUsers = async () => {
  return await prisma.user.count();
};
