import { TINYBIRD_BASE_URL } from '@modules/analytics/lib/analytics.constants';
import { AnalyticsDataType, LinkStatsResponse } from '@modules/analytics/types/analytics.types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const alias = req.nextUrl.pathname.split('/')[3];
    const stat = req.nextUrl.searchParams.get('stat') as AnalyticsDataType;

    const url = new URL(`${TINYBIRD_BASE_URL}pipes/link_${stat}.json`);

    url.searchParams.append('alias', alias);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.TINYBIRD_API_TOKEN}`,
      },
    });

    const { data }: { data: LinkStatsResponse<unknown> } = await response.json();

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return new NextResponse('An error occurred!', { status: 500 });
  }
}
