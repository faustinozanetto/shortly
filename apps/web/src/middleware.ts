import { trackLinkUserDetails } from '@modules/analytics/lib/analytics.lib';
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
  const path = req.nextUrl.pathname;
  let domain = req.headers.get('host') as string;
  domain = domain.replace('www.', '');

  if (!path.startsWith('/to')) return NextResponse.next();

  ev.waitUntil(trackLinkUserDetails(req, domain));
  console.log({ path });
}
