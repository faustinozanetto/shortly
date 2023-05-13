import { urlValidationSchema } from '../lib/url-shortener.lib';

const useURLShortener = () => {
  const generate = async (url: string) => {
    const validation = urlValidationSchema.safeParse({ url });
    if (!validation) throw new Error('The URL is invalid!');

    const response = await fetch('/api/short-link', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ link: url }),
    });

    const data = await response.json();

    return data;
  };

  return { generate };
};

export default useURLShortener;
