'use client';
import React, { useState } from 'react';

import useQRCode from '@modules/common/hooks/use-qr-code';
import { URL_QR_DEFAULT_OPTIONS, getCompleteShortenedURL } from '@modules/url-shortener/lib/url-shortener.lib';

import { Link } from '@prisma/client';
import URLShortenerQRCodeDialog from './url-shortener-qr-code-dialog';

type URLShortenerQRCodeProps = {
  link: Link | null;
  renderButton: (onClick: () => void) => JSX.Element;
};

const URLShortenerQRCode: React.FC<URLShortenerQRCodeProps> = (props) => {
  const { link, renderButton } = props;
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
      {renderButton(handleQRCodeGeneration)}
    </>
  );
};

export default URLShortenerQRCode;
