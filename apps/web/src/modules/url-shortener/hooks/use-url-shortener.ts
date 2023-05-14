import { generateRandomURLAlias, getCompleteShortenedURL } from '../lib/url-shortener.lib';
import { Link } from '@shortly/database';
import { GenerateShortenedURLPayload } from '../types/url-shortener.types';

const useURLShortener = () => {
  const generateShortenedURL = async (payload: GenerateShortenedURLPayload) => {
    const alias = payload.alias || generateRandomURLAlias(payload.url);
    const body = JSON.stringify({ url: payload.url, userId: payload.userId, alias });

    const response = await fetch('/api/shorten-link', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    });

    const data: { storedURL: Link; message: string } = await response.json();

    // Error handling
    if (!response.ok) {
      const errorMessage = data.message || 'An error has occurred!';
      throw new Error(errorMessage);
    }

    return getCompleteShortenedURL(data.storedURL.alias);
  };

  return { generateShortenedURL };
};

export default useURLShortener;
