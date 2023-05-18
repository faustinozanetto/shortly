'use client';
import useQRCode from '@modules/common/hooks/use-qr-code';
import { useURLShortenerContext } from '@modules/url-shortener/hooks/use-url-shortener-context';
import { URL_QR_DEFAULT_OPTIONS, getCompleteShortenedURL } from '@modules/url-shortener/lib/url-shortener.lib';
import React, { useState } from 'react';
import URLShortenerResultQRCodeDialog from '../qr-code/url-shortener-result-qr-code-dialog';
import IconButton from '@modules/ui/components/icon-button/icon-button';
import QRIcon from '@modules/ui/components/icons/qr-icon';

const URLShortenerResultActionsQRCode: React.FC = () => {
  const [displayQRDialog, setDisplayQRDialog] = useState<boolean>(false);

  const { generateQRCode, encodedQR } = useQRCode(URL_QR_DEFAULT_OPTIONS);

  const { shortenedURL } = useURLShortenerContext();

  const handleQRCodeGeneration = async () => {
    if (!shortenedURL) return;

    const completeURL = getCompleteShortenedURL(shortenedURL.alias);
    await generateQRCode(completeURL);
    setDisplayQRDialog(true);
  };

  return (
    <>
      <URLShortenerResultQRCodeDialog isOpen={displayQRDialog} onOpenChange={setDisplayQRDialog} qrResult={encodedQR} />
      <IconButton aria-label="Create QR Code" onClick={handleQRCodeGeneration} icon={<QRIcon />} />
    </>
  );
};

export default URLShortenerResultActionsQRCode;
