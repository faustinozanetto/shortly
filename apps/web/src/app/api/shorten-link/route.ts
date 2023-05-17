import { storeShortenedURL } from '@modules/url-shortener/lib/url-shortener-db';
import { linkValidationSchema } from '@modules/validations/lib/validations-link';

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

import { Prisma } from '@prisma/client';

import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';

const shortenLinkRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(1, '10 s'),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { url, alias, userId } = body;

  try {
    const ip = request.headers.get('x-forwarded-for') ?? '';
    const { success, reset } = await shortenLinkRateLimit.limit(ip);

    if (!success) {
      const now = Date.now();
      const retryAfterSeconds = Math.floor((reset - now) / 1000);
      return NextResponse.json(
        { message: 'Too Many Requests' },
        {
          status: 429,
          headers: {
            ['retry-after']: `${retryAfterSeconds}`,
          },
        }
      );
    }

    // Validate body input
    linkValidationSchema.parse({
      url,
      alias,
    });

    const storedURL = await storeShortenedURL({ url, alias, userId });
    return NextResponse.json(
      { storedURL, message: `Shorted URL for alias '${alias}' created successfully!` },
      { status: 200 }
    );
  } catch (error) {
    // Alias unique constraint
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return NextResponse.json({ message: `The alias '${alias}' is already taken!` }, { status: 400 });
    }

    if (error instanceof ZodError) {
      const validationError = fromZodError(error);
      if (validationError.details.length > 0)
        return NextResponse.json({ message: validationError.details[0].message }, { status: 400 });
    }
  }
}
