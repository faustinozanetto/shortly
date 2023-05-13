import { nanoid } from 'nanoid';
import { prisma } from '@shortly/database';
import { StoreShortedURLPayload } from '../types/url-shortener.types';

export const HASH_LENGTH = 12;

export const generateURLShortenHash = (url: string): string => {
  const hash = nanoid(HASH_LENGTH);
  return hash;
};

export const storeShortedURL = async (payload: StoreShortedURLPayload) => {
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
