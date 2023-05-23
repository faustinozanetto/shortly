import {
  CUSTOM_ALIAS_MAX_LENGTH,
  URL_PASSWORD_MAX_LEGNTH,
  URL_PASSWORD_MIN_LEGNTH,
} from '@modules/url-shortener/lib/url-shortener.lib';
import { z } from 'zod';

const linkPasswordValidation = z
  .string()
  .min(URL_PASSWORD_MIN_LEGNTH, `The min length is ${URL_PASSWORD_MIN_LEGNTH}`)
  .max(URL_PASSWORD_MAX_LEGNTH, `The max length is ${URL_PASSWORD_MAX_LEGNTH}`)
  .regex(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
    'Password must contain at least one letter, one number, and one special character'
  );

export const linkPasswordOptionalValidationSchema = z.object({
  password: linkPasswordValidation.optional(),
});
export const linkPasswordValidationSchema = z.object({
  password: linkPasswordValidation,
});

export const linkURLValidationSchema = z.object({
  url: z
    .string({ required_error: 'URL is required!' })
    .trim()
    .url({ message: 'The URL provided is invalid!' })
    .refine((value) => value.startsWith('https'), { message: 'URL must use https protocol!' }),
});

export const linkAliasValidationSchema = z.object({
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

export const linkValidationSchema = z
  .object({
    expiresAt: z.coerce.date().min(new Date(), { message: 'Expires date must be in the future!' }).optional(),
  })
  .merge(linkURLValidationSchema)
  .merge(linkAliasValidationSchema)
  .merge(linkPasswordOptionalValidationSchema);
