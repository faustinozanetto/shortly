'use client';
import IconButton from '@modules/ui/components/icon-button/icon-button';
import LoadingIcon from '@modules/ui/components/icons/loading-icon';
import { useURLShortenerContext } from '@modules/url-shortener/hooks/use-url-shortener-context';
import React from 'react';
import URLShortenerCopyLink from '../../copy/url-shortener-copy-link';
import CopyIcon from '@modules/ui/components/icons/copy-icon';

const URLShortenerResultActionsCopy: React.FC = () => {
  const { shortenedURL } = useURLShortenerContext();

  if (!shortenedURL) return null;

  return (
    <URLShortenerCopyLink
      link={shortenedURL}
      renderButton={(onClick, isCopyingLoading) => (
        <IconButton
          aria-label="Copy Shortened URL"
          onClick={onClick}
          icon={isCopyingLoading ? <LoadingIcon /> : <CopyIcon />}
        />
      )}
    />
  );
};

export default URLShortenerResultActionsCopy;
