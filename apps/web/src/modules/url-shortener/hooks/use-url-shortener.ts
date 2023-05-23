import { Link } from '@prisma/client';
import { generateRandomURLAlias } from '../lib/url-shortener.lib';

import { GenerateShortenedURLPayload } from '../types/url-shortener.types';

const useURLShortener = () => {
  const generateShortenedURL = async (payload: GenerateShortenedURLPayload) => {
    const alias = payload.alias || generateRandomURLAlias();
    const body = JSON.stringify({
      url: payload.url,
      userEmail: payload.userEmail,
      alias,
      expiresAt: payload.expiresAt,
      password: payload.password,
    });

    const response = await fetch('/api/links', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    });

    const data: { storedLink: Link; message: string } = await response.json();

    // Error handling
    if (!response.ok) {
      const errorMessage = data.message || 'An error has occurred!';
      throw new Error(errorMessage);
    }

    return data.storedLink;
  };

  return { generateShortenedURL };
};

export default useURLShortener;
