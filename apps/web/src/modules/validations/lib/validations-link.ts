import { CUSTOM_ALIAS_MAX_LENGTH } from '@modules/url-shortener/lib/url-shortener.lib';
import { z } from 'zod';

export const linkValidationSchema = z.object({
  url: z
    .string()
    .trim()
    .url({ message: 'The URL provided is invalid!' })
    .refine((value) => value.startsWith('https'), { message: 'URL must use https protocol!' }),
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
