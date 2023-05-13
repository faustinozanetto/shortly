import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { retrieveShortenedURL } from '@modules/url-shortener/lib/url-shortener-db';

export const metadata: Metadata = {
  title: 'Home Page | Shortly',
  description: 'Shortly is a free and easy to use url shortner.',
};

type UrlHashPageProps = {
  params: {
    hash: string;
  };
};

export default async function UrlHashPage(props: UrlHashPageProps) {
  const { params } = props;

  const storedUrl = await retrieveShortenedURL({ hash: params.hash });
  if (!storedUrl) return redirect('/');

  return redirect(storedUrl.url);
}
