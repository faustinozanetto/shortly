import { NextRequest, userAgent } from 'next/server';
import { TINYBIRD_BASE_URL, URL_CLICK_EVENT } from './analytics.constants';

export const trackShortenedUrlClick = async (request: NextRequest, domain: string) => {
  const geoLocation = request.geo;

  const linkAlias = request.nextUrl.pathname.slice(4);

  const reqUserAgent = userAgent(request);
  const referer = request.headers.get('referer');

  const body = JSON.stringify({
    alias: linkAlias,
    domain,
    timestamp: new Date(Date.now()).toISOString(),
    country: geoLocation?.country || 'Unknown',
    city: geoLocation?.city || 'Unknown',
    region: geoLocation?.region || 'Unknown',
    latitude: geoLocation?.latitude || 'Unknown',
    longitude: geoLocation?.longitude || 'Unknown',
    ua: reqUserAgent.ua || 'Unknown',
    browser: reqUserAgent.browser.name || 'Unknown',
    browser_version: reqUserAgent.browser.version || 'Unknown',
    engine: reqUserAgent.engine.name || 'Unknown',
    engine_version: reqUserAgent.engine.version || 'Unknown',
    os: reqUserAgent.os.name || 'Unknown',
    os_version: reqUserAgent.os.version || 'Unknown',
    device: reqUserAgent.device.type ? reqUserAgent.device.type : 'Desktop',
    device_vendor: reqUserAgent.device.vendor || 'Unknown',
    device_model: reqUserAgent.device.model || 'Unknown',
    referer: referer ?? '(direct)',
  });

  const response = await fetch(`${TINYBIRD_BASE_URL}events?name=${URL_CLICK_EVENT}&wait=true`, {
    method: 'POST',
    body,
    headers: {
      Authorization: `Bearer ${process.env.TINYBIRD_API_TOKEN}`,
    },
  });

  const data = await response.json();
  return data;
};
