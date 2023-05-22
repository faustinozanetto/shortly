'use client';
import { useURLShortenerContext } from '@modules/url-shortener/hooks/use-url-shortener-context';
import React from 'react';
import URLShortenerQRCode from '../../qr-code/url-shortener-qr-code';

const URLShortenerResultActionsQRCode: React.FC = () => {
  const { shortenedURL } = useURLShortenerContext();

  if (!shortenedURL) return null;

  return <URLShortenerQRCode link={shortenedURL} />;
};

export default URLShortenerResultActionsQRCode;
