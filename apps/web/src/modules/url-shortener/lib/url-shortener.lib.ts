import { nanoid } from 'nanoid';
import { z } from 'zod';

export const CUSTOM_ALIAS_MAX_LENGTH = 14;

export const urlValidationSchema = z.object({
  url: z.string().trim().url({ message: 'The URL provided is invalid!' }),
});

export const completeUrlValidationSchema = urlValidationSchema.extend({
  alias: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^([a-zA-Z0-9_-]+)?$/, {
      message: 'Alias must include letters and numbers!',
    })
    .max(CUSTOM_ALIAS_MAX_LENGTH, {
      message: `Alias max lenght is ${CUSTOM_ALIAS_MAX_LENGTH}`,
    })
    .optional(),
});

export const generateRandomURLAlias = (url: string): string => {
  return nanoid(CUSTOM_ALIAS_MAX_LENGTH);
};

export const getCompleteShortenedURL = (hash: string): string => {
  const BASE_PATH = process.env.NEXT_PUBLIC_URL;
  return `${BASE_PATH}/to/${hash}`;
};
