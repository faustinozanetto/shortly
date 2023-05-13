import { nanoid } from 'nanoid';
import { prisma } from '@shortly/database';
import { RetrieveShortenedURLPayload, StoreShortenedURLPayload } from '../types/url-shortener.types';

export const HASH_LENGTH = 12;

export const generateURLShortenHash = (url: string): string => {
  const hash = nanoid(HASH_LENGTH);
  return hash;
};

export const storeShortenedURL = async (payload: StoreShortenedURLPayload) => {
  try {
    const link = await prisma.link.create({
      data: {
        hash: payload.hash,
        url: payload.originalURL,
      },
    });

    return link;
  } catch (err) {
    throw new Error('Could not store shortened URL!');
  }
};

export const retrieveShortenedURL = async (payload: RetrieveShortenedURLPayload) => {
  try {
    const link = await prisma.link.findFirst({
      where: {
        hash: payload.hash,
      },
    });

    if (!link) throw new Error('No shortened URL found with the given hash!');

    return link;
  } catch (err) {
    throw new Error('Could not retrieve shortened URL!');
  }
};
