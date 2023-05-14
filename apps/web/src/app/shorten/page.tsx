import { Metadata } from 'next';
import URLShortener from '@modules/url-shortener/components/url-shortener';

export const metadata: Metadata = {
  title: 'Shorten Link',
};

const URLShortenerPage = () => {
  return (
    <div className="mx-4 flex w-full flex-col items-center md:mx-0">
      <URLShortener />
    </div>
  );
};

export default URLShortenerPage;
