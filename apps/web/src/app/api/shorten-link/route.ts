import { storeShortenedURL } from '@modules/url-shortener/lib/url-shortener-db';
import { completeUrlValidationSchema } from '@modules/url-shortener/lib/url-shortener.lib';
import { Prisma } from '@shortly/database';

import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';

export async function POST(request: Request) {
  const body = await request.json();
  const { url, alias, userId } = body;

  try {
    // Validate body input
    completeUrlValidationSchema.parse({
      url,
      alias,
    });

    const storedURL = await storeShortenedURL({ url, userId, alias });
    return NextResponse.json(
      { storedURL, message: `Shorted URL for alias '${alias}' created successfully!` },
      { status: 200 }
    );
  } catch (error) {
    // Alias unique constraint
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return NextResponse.json({ message: `The alias '${alias}' is already taken!` }, { status: 400 });
    }
    // Handle validation errors
    if (error instanceof ZodError) {
      const validationError = fromZodError(error);
      if (validationError.details.length > 0)
        return NextResponse.json({ message: validationError.details[0].message }, { status: 400 });
    }
  }
}
