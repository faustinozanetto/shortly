import { Metadata } from 'next';
import URLShortener from '@modules/url-shortener/components/url-shortener';
import { getCurrentUser } from '@modules/auth/lib/auth.lib';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Shorten Link',
};

export default async function URLShortenerPage() {
  const user = await getCurrentUser();

  if (!user) {
    return redirect('/');
  }

  return (
    <div className="mx-4 flex w-full flex-col items-center md:mx-0">
      <URLShortener user={user} />
    </div>
  );
}
