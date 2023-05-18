import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import {
  getLinkFromAlias,
  getOriginalUrlFromAlias,
  incrementShortenedURLClicks,
} from '@modules/url-shortener/lib/url-shortener-db';
import { getShortenedURLIsExpired } from '@modules/url-shortener/lib/url-shortener.lib';

type UrlHashPageProps = {
  params: {
    alias: string;
  };
};

export async function generateMetadata({ params }: UrlHashPageProps): Promise<Metadata> {
  return { title: params.alias };
}

export default async function UrlHashPage(props: UrlHashPageProps) {
  const { params } = props;
  const { alias } = params;

  const url = await getOriginalUrlFromAlias({ alias });
  if (!url) return redirect('/');

  const link = await getLinkFromAlias({ alias });
  if (getShortenedURLIsExpired(link)) {
    return <h1>Link is Expired</h1>;
  }

  await incrementShortenedURLClicks({ alias });

  return redirect(url);
}
