'use server';
import {
  RetrieveShortenedURLPayload,
  StoreShortenedURLPayload,
} from '@modules/url-shortener/types/url-shortener.types';
import { prisma } from '@shortly/database';

export const storeShortenedURL = async (payload: StoreShortenedURLPayload) => {
  const link = await prisma.link.create({
    data: {
      hash: payload.hash,
      url: payload.originalURL,
    },
  });

  if (!link) throw new Error('Could not create shortened URL!');

  return link;
};

export const retrieveShortenedURL = async (payload: RetrieveShortenedURLPayload) => {
  const link = await prisma.link.findFirst({
    where: {
      hash: payload.hash,
    },
  });

  return link;
};
