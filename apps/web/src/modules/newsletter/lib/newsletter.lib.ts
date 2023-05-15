import { z } from 'zod';

export const newsletterSubscribeFormValidation = z.object({
  email: z.string().email('The email is invalid!'),
});
