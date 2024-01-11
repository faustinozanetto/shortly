'use client';
import LoadingIcon from '@modules/ui/components/icons/loading-icon';

import React from 'react';
import URLShortenerCopyLink from '../../copy/url-shortener-copy-link';
import CopyIcon from '@modules/ui/components/icons/copy-icon';
import { Button } from '@modules/ui/components/button/button';
import { useUrlShortenerStore } from '@modules/url-shortener/state/url-shortener.slice';

const URLShortenerResultActionsCopy: React.FC = () => {
  const { shortenedURL } = useUrlShortenerStore();

  if (!shortenedURL) return null;

  return (
    <URLShortenerCopyLink
      link={shortenedURL}
      renderButton={(onClick, isCopyingLoading) => (
        <Button aria-label="Copy Shortened URL" onClick={onClick} size="icon">
          {isCopyingLoading ? <LoadingIcon className="stroke-current" /> : <CopyIcon className="stroke-current" />}
        </Button>
      )}
    />
  );
};

export default URLShortenerResultActionsCopy;
