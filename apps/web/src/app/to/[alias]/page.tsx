import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { incrementShortenedURLClicks, retrieveShortenedURL } from '@modules/url-shortener/lib/url-shortener-db';

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

  const storedUrl = await retrieveShortenedURL({ alias });
  if (!storedUrl) return redirect('/');

  await incrementShortenedURLClicks({ alias });

  return redirect(storedUrl.url);
}
