import { linkValidationSchema } from '@modules/validations/lib/validations-link';

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

import { Prisma } from '@prisma/client';

import bcrypt from 'bcrypt';

import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { storeLinkInDatabase } from '@modules/url-shortener/lib/url-shortener-db';
import { prisma } from '@modules/database/lib/database.lib';
import { authOptions } from '@modules/auth/lib/auth.lib';
import { getServerSession } from 'next-auth';
import { DASHBOARD_LINKS_PAGE_SIZE } from '@modules/dashboard/lib/dashboard.constants';

const shortenLinkRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(1, '10 s'),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page') ?? 0);

    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const skip = DASHBOARD_LINKS_PAGE_SIZE * page;

    const totalCount = await prisma.link.count({
      where: {
        user: { email: session.user.email },
      },
    });

    const links = await prisma.link.findMany({
      where: {
        user: { email: session.user.email },
      },
      take: DASHBOARD_LINKS_PAGE_SIZE,
      skip: skip,
      orderBy: { createdAt: 'desc' },
    });

    const totalPages = Math.ceil(totalCount / DASHBOARD_LINKS_PAGE_SIZE) - 1;
    const hasMore = page < totalPages;

    return NextResponse.json({ links, totalCount, totalPages, currentPage: page, hasMore }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { url, alias, userEmail, expiresAt, password } = body;

  try {
    // Check for rate limiting based on ip.
    const ip = request.headers.get('x-forwarded-for') ?? '';
    const { success, reset } = await shortenLinkRateLimit.limit(ip);

    if (!success) {
      const now = Date.now();
      const retryAfterSeconds = Math.floor((reset - now) / 1000);
      return NextResponse.json(
        { message: 'Slow down, you are trying too fast!' },
        {
          status: 429,
          headers: {
            ['retry-after']: `${retryAfterSeconds}`,
          },
        }
      );
    }

    // Validate body input again
    linkValidationSchema.parse({
      url,
      alias,
      expiresAt,
      password,
    });
    /*
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
    }*/

    let hashedPassword: string | undefined = undefined;
    // Hash password
    if (password) hashedPassword = await bcrypt.hash(password, 10);

    const storedLink = await storeLinkInDatabase({ url, alias, expiresAt, userEmail, password: hashedPassword });

    return NextResponse.json(
      { storedLink, message: `Shorted URL for alias '${alias}' created successfully!` },
      { status: 200 }
    );
  } catch (error) {
    // Alias unique constraint
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return NextResponse.json({ message: `The alias '${alias}' is already taken!` }, { status: 400 });
    }

    // Validation errors
    if (error instanceof ZodError) {
      const validationError = fromZodError(error);
      if (validationError.details.length > 0)
        return NextResponse.json({ message: validationError.details[0].message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Could not generate shortened URL!' }, { status: 400 });
  }
}
