import { z } from 'zod';
import { newsletterSubscribeFormValidation } from '../lib/newsletter.lib';

export type NewsletterFormData = z.infer<typeof newsletterSubscribeFormValidation>;
