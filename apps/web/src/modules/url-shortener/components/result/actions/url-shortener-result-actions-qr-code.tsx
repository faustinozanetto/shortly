'use client';
import React from 'react';

import URLShortenerQRCode from '../../qr-code/url-shortener-qr-code';
import QRIcon from '@modules/ui/components/icons/qr-icon';
import { Button } from '@modules/ui/components/button/button';
import { useUrlShortenerStore } from '@modules/url-shortener/state/url-shortener.slice';

const URLShortenerResultActionsQRCode: React.FC = () => {
  const { shortenedURL } = useUrlShortenerStore();

  if (!shortenedURL) return null;

  return (
    <URLShortenerQRCode
      link={shortenedURL}
      renderButton={(onClick) => {
        return (
          <Button aria-label="Create QR Code" onClick={onClick} size="icon">
            <QRIcon className="stroke-current" />
          </Button>
        );
      }}
    />
  );
};

export default URLShortenerResultActionsQRCode;
