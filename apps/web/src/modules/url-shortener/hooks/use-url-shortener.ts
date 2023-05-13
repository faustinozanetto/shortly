import { generateURLShortenHash, urlValidationSchema } from '../lib/url-shortener.lib';
import { storeShortenedURL } from '@modules/url-shortener/lib/url-shortener-db';

const useURLShortener = () => {
  const generate = async (url: string) => {
    const validation = urlValidationSchema.safeParse({ url });
    if (!validation) throw new Error('The URL is invalid!');

    const hash = generateURLShortenHash(url);
    const storedURL = await storeShortenedURL({ hash, originalURL: url });
    return storedURL;
  };

  return { generate };
};

export default useURLShortener;
