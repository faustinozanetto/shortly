import { nanoid } from 'nanoid';
import { z } from 'zod';

export const HASH_LENGTH = 12;

export const urlValidationSchema = z.object({
  url: z.string().trim().url({ message: 'The URL provided is invalid!' }),
});

export const generateURLShortenHash = (url: string): string => {
  const hash = nanoid(HASH_LENGTH);
  return hash;
};
