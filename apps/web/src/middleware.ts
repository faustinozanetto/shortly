import { siteConfig } from '@config/config';
import { trackShortenedUrlClick } from '@modules/analytics/lib/analytics.lib';
import { getLinkFromAlias } from '@modules/redis/lib/redis.lib';

import { NextRequest, NextFetchEvent, NextResponse } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api/ routes
     * 2. /_next/ (Next.js internals)
     * 3. /_static (inside /public)
     * 4. /_vercel (Vercel internals)
     * 5. /favicon.ico, /sitemap.xml (static files)
     */
    '/((?!api/|_next/|_static|_vercel|favicon.ico|sitemap.xml).*)',
  ],
};

export default async function middleware(req: NextRequest, ev: NextFetchEvent) {
  try {
    const path = req.nextUrl.pathname;
    let domain = req.headers.get('host') as string;
    domain = domain.replace('www.', '');

    // If the path is not a link, continue.
    if (!path.startsWith('/to')) return NextResponse.next();

    const alias = decodeURIComponent(path.split('/')[2]);
    const link = await getLinkFromAlias({ alias });

    // Track url click
    ev.waitUntil(trackShortenedUrlClick(req, domain));

    // If has password, redirect to access page
    if (link.password) {
      return NextResponse.rewrite(new URL(`/access/${alias}`, req.url));
    }
  } catch (err) {
    return NextResponse.redirect(siteConfig.url);
  }
}
