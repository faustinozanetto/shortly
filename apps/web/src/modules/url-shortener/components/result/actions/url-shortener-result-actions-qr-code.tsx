'use client';
import { useURLShortenerContext } from '@modules/url-shortener/hooks/use-url-shortener-context';
import React from 'react';
import URLShortenerQRCode from '../../qr-code/url-shortener-qr-code';
import IconButton from '@modules/ui/components/icon-button/icon-button';
import QRIcon from '@modules/ui/components/icons/qr-icon';

const URLShortenerResultActionsQRCode: React.FC = () => {
  const { shortenedURL } = useURLShortenerContext();

  if (!shortenedURL) return null;

  return (
    <URLShortenerQRCode
      link={shortenedURL}
      renderButton={(onClick) => <IconButton aria-label="Create QR Code" onClick={onClick} icon={<QRIcon />} />}
    />
  );
};

export default URLShortenerResultActionsQRCode;
