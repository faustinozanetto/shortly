import { NextRequest, NextResponse } from 'next/server';
import { generateURLShortenHash, storeShortedURL } from '@modules/url-shortener/lib/url-shortener.lib';

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const link = body.link;

  const hash = generateURLShortenHash(link);
  const storedLink = await storeShortedURL({ hash, originalURL: link });

  console.log({ storedLink });

  return NextResponse.json({ hash });
};
