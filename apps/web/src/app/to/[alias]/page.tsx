import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getOriginalUrlFromAlias, incrementShortenedURLClicks } from '@modules/url-shortener/lib/url-shortener-db';

export const metadata: Metadata = {
  title: 'URL Page | Shortly',
};

type UrlHashPageProps = {
  params: {
    alias: string;
  };
};

export default async function UrlHashPage(props: UrlHashPageProps) {
  const { params } = props;
  const { alias } = params;

  const url = await getOriginalUrlFromAlias({ alias });
  if (!url) return redirect('/');

  await incrementShortenedURLClicks({ alias });

  return redirect(url);
}
