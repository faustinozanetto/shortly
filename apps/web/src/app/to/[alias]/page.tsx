import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { incrementShortenedURLClicks, retrieveShortenedURL } from '@modules/url-shortener/lib/url-shortener-db';

export const metadata: Metadata = {
  title: 'Home Page | Shortly',
  description: 'Shortly is a free and easy to use url shortner.',
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
  // Redirect back to home if not found
  if (!storedUrl) return redirect('/');

  await incrementShortenedURLClicks({ alias });

  return redirect(storedUrl.url);
}
