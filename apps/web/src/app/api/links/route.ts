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

  const { url, alias, userEmail } = body;

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

    // Google safe browsing api validation
    const googleSafeBrowsingAPI = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${process.env.GOOGLE_API_KEY}`;

    const requestBody = {
      client: {
        clientId: '947669905411',
        clientVersion: '1.0.0',
      },
      threatInfo: {
        threatTypes: [
          'MALWARE',
          'UNWANTED_SOFTWARE',
          'THREAT_TYPE_UNSPECIFIED',
          'POTENTIALLY_HARMFUL_APPLICATION',
          'SOCIAL_ENGINEERING',
        ],
        platformTypes: ['ANY_PLATFORM'],
        threatEntryTypes: ['URL'],
        threatEntries: [{ url }],
      },
    };

    const response = await fetch(googleSafeBrowsingAPI, {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });

    if (response.status !== 200) {
      return NextResponse.json({ message: 'The url to shorten might be harmful!' }, { status: 403 });
    }

    const storedURL = await storeShortenedURL({ url, alias, userEmail });
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
