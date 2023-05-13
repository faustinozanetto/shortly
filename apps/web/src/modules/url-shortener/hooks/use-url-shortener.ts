import { getCompleteShortenedURL, urlValidationSchema } from '../lib/url-shortener.lib';
import { Link } from '@shortly/database';

const useURLShortener = () => {
  const generateShortenedURL = async (url: string) => {
    const validation = urlValidationSchema.safeParse({ url });
    if (!validation) throw new Error('The URL is invalid!');

    const fetchBody = { url };

    const response = await fetch('/api/short-link', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fetchBody),
    });

    const data: { storedURL: Link } = await response.json();
    const completeURL = getCompleteShortenedURL(data.storedURL.hash);
    return completeURL;
  };

  return { generateShortenedURL };
};

export default useURLShortener;
