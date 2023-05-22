'use client';
import useQRCode from '@modules/common/hooks/use-qr-code';
import { URL_QR_DEFAULT_OPTIONS, getCompleteShortenedURL } from '@modules/url-shortener/lib/url-shortener.lib';
import React, { useState } from 'react';

import IconButton from '@modules/ui/components/icon-button/icon-button';
import QRIcon from '@modules/ui/components/icons/qr-icon';
import { Link } from '@prisma/client';
import URLShortenerQRCodeDialog from './url-shortener-qr-code-dialog';

type URLShortenerQRCodeProps = {
  link: Link;
};

const URLShortenerQRCode: React.FC<URLShortenerQRCodeProps> = (props) => {
  const { link } = props;
  const [displayQRDialog, setDisplayQRDialog] = useState<boolean>(false);

  const { generateQRCode, encodedQR } = useQRCode(URL_QR_DEFAULT_OPTIONS);

  const handleQRCodeGeneration = async () => {
    if (!link) return;

    const completeURL = getCompleteShortenedURL(link.alias);
    await generateQRCode(completeURL);
    setDisplayQRDialog(true);
  };

  return (
    <>
      <URLShortenerQRCodeDialog isOpen={displayQRDialog} onOpenChange={setDisplayQRDialog} qrResult={encodedQR} />
      <IconButton aria-label="Create QR Code" onClick={handleQRCodeGeneration} icon={<QRIcon />} />
    </>
  );
};

export default URLShortenerQRCode;
