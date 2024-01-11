import { TINYBIRD_BASE_URL } from '@modules/analytics/lib/analytics.constants';
import { LinkGroupedClicksResponse } from '@modules/analytics/types/analytics.types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const alias = req.nextUrl.pathname.split('/')[3];

    const url = new URL(`${TINYBIRD_BASE_URL}pipes/links_clicks_grouped.json`);

    url.searchParams.append('alias', alias);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.TINYBIRD_API_TOKEN}`,
      },
    });

    const { data }: { data: LinkGroupedClicksResponse } = await response.json();

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return new NextResponse('An error occurred!', { status: 500 });
  }
}
