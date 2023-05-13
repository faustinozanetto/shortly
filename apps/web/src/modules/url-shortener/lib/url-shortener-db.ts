'use server';
import {
  RetrieveShortenedURLPayload,
  StoreShortenedURLPayload,
} from '@modules/url-shortener/types/url-shortener.types';
import { prisma } from '@shortly/database';

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
