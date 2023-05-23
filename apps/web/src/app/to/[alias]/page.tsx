import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { incrementShortenedURLClicks } from '@modules/url-shortener/lib/url-shortener-db';
import { getShortenedURLIsExpired } from '@modules/url-shortener/lib/url-shortener.lib';
import { getLinkFromAlias } from '@modules/redis/lib/redis.lib';

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

  const link = await getLinkFromAlias({ alias });
  if (!link) return redirect('/');

  await incrementShortenedURLClicks({ alias });

  return redirect(link.url);
}
