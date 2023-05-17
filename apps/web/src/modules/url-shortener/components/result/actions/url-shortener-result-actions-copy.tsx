'use client';
import useCopyToClipboard from '@modules/common/hooks/use-copy-to-clipboard';
import { useToast } from '@modules/toasts/hooks/use-toast';
import IconButton from '@modules/ui/components/icon-button/icon-button';
import LoadingIcon from '@modules/ui/components/icons/loading-icon';
import { useURLShortenerContext } from '@modules/url-shortener/hooks/use-url-shortener-context';
import { getCompleteShortenedURL } from '@modules/url-shortener/lib/url-shortener.lib';
import React, { useState } from 'react';

const URLShortenerResultActionsCopy: React.FC = () => {
  const [isCopyingLoading, setIsCopyingLoading] = useState<boolean>(false);

  const { toast } = useToast();
  const { shortenedURL } = useURLShortenerContext();
  const { copyToClipboard } = useCopyToClipboard();

  const handleURLCopy = async () => {
    if (!shortenedURL) return;
    try {
      setIsCopyingLoading(true);
      const completeURL = getCompleteShortenedURL(shortenedURL.alias);
      await copyToClipboard(completeURL);
      setIsCopyingLoading(false);
      toast({ variant: 'success', content: 'URL copied successfully!' });
    } catch (error) {
      setIsCopyingLoading(false);
      toast({ variant: 'error', content: 'An error occurred while copying!' });
    }
  };

  return (
    <IconButton
      aria-label="Copy Shortened URL"
      onClick={handleURLCopy}
      icon={
        isCopyingLoading ? (
          <LoadingIcon />
        ) : (
          <svg
            className="h-5 w-5 stroke-neutral-900 dark:stroke-neutral-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h3m9 -9v-5a2 2 0 0 0 -2 -2h-2" />
            <path d="M13 17v-1a1 1 0 0 1 1 -1h1m3 0h1a1 1 0 0 1 1 1v1m0 3v1a1 1 0 0 1 -1 1h-1m-3 0h-1a1 1 0 0 1 -1 -1v-1" />
            <rect x="9" y="3" width="6" height="4" rx="2" />
          </svg>
        )
      }
    />
  );
};

export default URLShortenerResultActionsCopy;
