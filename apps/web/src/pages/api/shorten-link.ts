import { storeShortenedURL } from '@modules/url-shortener/lib/url-shortener-db';
import { completeUrlValidationSchema } from '@modules/url-shortener/lib/url-shortener.lib';
import { Prisma } from '@shortly/database';
import { NextApiRequest, NextApiResponse } from 'next';
import { ZodError } from 'zod';
import { ValidationError, fromZodError } from 'zod-validation-error';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { url, alias, userId } = req.body;

    try {
      // Validate body input
      completeUrlValidationSchema.parse({
        url,
        alias,
      });

      const storedURL = await storeShortenedURL({ url, userId, alias });
      return res.status(200).json({ storedURL, message: `Shorted URL for alias '${alias}' created successfully!` });
    } catch (error) {
      // Alias unique constraint
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        return res.status(400).json({ message: `The alias '${alias}' is already taken!` });
      }
      // Handle validation errors
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        if (validationError.details.length > 0)
          return res.status(400).json({ message: validationError.details[0].message });
      }
    }
  } else {
    return res.status(405).json({ message: 'Invalid request method.' });
  }
}
