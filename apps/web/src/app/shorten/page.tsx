import { Metadata } from 'next';
import URLShortener from '@modules/url-shortener/components/url-shortener';
import { getCurrentUser } from '@modules/auth/lib/auth.lib';
import { redirect } from 'next/navigation';
import URLShortenerProvider from '@modules/url-shortener/context/url-shortener-context';

export const metadata: Metadata = {
  title: 'Shorten Link',
  description: 'Shorten your links with a few clicks.',
};

export default async function URLShortenerPage() {
  const user = await getCurrentUser();

  if (!user) {
    return redirect('/');
  }

  return (
    <URLShortenerProvider>
      <div className="container my-4 md:my-14 lg:my-20">
        <URLShortener user={user} />
      </div>
    </URLShortenerProvider>
  );
}
