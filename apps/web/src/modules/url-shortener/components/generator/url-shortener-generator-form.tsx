'use client';
import React, { useState } from 'react';

import { Button } from '@modules/ui/components/button/button';
import useURLShortener from '@modules/url-shortener/hooks/use-url-shortener';

import { useToast } from '@modules/toasts/hooks/use-toast';
import { Session } from 'next-auth';
import LoadingIcon from '@modules/ui/components/icons/loading-icon';

import URLShortenerBaseForm, { URLBaseFormData } from '../forms/url-shortener-base-form';
import { useRouter } from 'next/navigation';
import { useUrlShortenerStore } from '@modules/url-shortener/state/url-shortener.slice';
import ShortLinkIcon from '@modules/ui/components/icons/short-link-icon';

type URLShortenerGeneratorFormProps = {
  user: Session['user'] | null;
};

const URLShortenerGeneratorForm: React.FC<URLShortenerGeneratorFormProps> = (props) => {
  const { user } = props;

  const router = useRouter();

  const { toast } = useToast();
  const { setShortenedURL } = useUrlShortenerStore();
  const { generateShortenedURL } = useURLShortener();

  const [isShortenLoading, setIsShortenLoading] = useState<boolean>(false);

  const handleFormSubmit = async (data: URLBaseFormData) => {
    if (!user) return;

    try {
      setIsShortenLoading(true);

      const shortenedURL = await generateShortenedURL({ ...data, userEmail: user.email! });
      setShortenedURL(shortenedURL);
      setIsShortenLoading(false);
      toast({ variant: 'success', content: 'URL shortened successfully!' });
      router.push(`/dashboard/${shortenedURL.alias}`);
    } catch (error) {
      setIsShortenLoading(false);
      toast({ variant: 'error', content: error.message });
    }
  };

  return (
    <URLShortenerBaseForm onSubmitted={handleFormSubmit}>
      <Button type="submit" className="w-full" disabled={isShortenLoading}>
        {isShortenLoading ? <LoadingIcon className="mr-2 stroke-current" /> : <ShortLinkIcon className="mr-2" />}
        Shorten Now
      </Button>
    </URLShortenerBaseForm>
  );
};

export default URLShortenerGeneratorForm;
