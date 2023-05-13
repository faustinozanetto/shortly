import { NextRequest, NextResponse } from 'next/server';
import { generateURLShortenHash } from '@modules/url-shortener/lib/url-shortener.lib';
import { storeShortenedURL } from '@modules/url-shortener/lib/url-shortener-db';

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const url = body.url;

  const hash = generateURLShortenHash(url);
  const storedURL = await storeShortenedURL({ hash, originalURL: url });

  return NextResponse.json({ storedURL });
};
