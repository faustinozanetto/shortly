import { retrieveShortenedURL } from '@modules/url-shortener/lib/url-shortener.lib';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

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

  try {
    const storedUrl = await retrieveShortenedURL({ hash: params.hash });
    return redirect(storedUrl.url);
  } catch (err) {
    return redirect('/');
  }
}
