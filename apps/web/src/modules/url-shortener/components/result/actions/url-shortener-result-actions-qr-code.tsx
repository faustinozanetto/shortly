'use client';
import useQRCode from '@modules/common/hooks/use-qr-code';
import IconButton from '@modules/ui/components/icon-button/icon-button';
import LoadingIcon from '@modules/ui/components/icons/loading-icon';
import { useURLShortenerContext } from '@modules/url-shortener/hooks/use-url-shortener-context';
import { getCompleteShortenedURL } from '@modules/url-shortener/lib/url-shortener.lib';
import React, { useState } from 'react';
import URLShortenerResultActionsQRCodeDialog from './url-shortener-result-actions-qr-code-dialog';

const URLShortenerResultActionsQRCode: React.FC = () => {
  const { generateQRCode, isLoading, encodedQR } = useQRCode({ margin: 1.5, scale: 60, type: 'image/webp' });
  const [displayDialog, setDisplayDialog] = useState<boolean>(false);

  const { shortenedURL } = useURLShortenerContext();

  const handleQRCodeGeneration = async () => {
    if (!shortenedURL) return;

    const completeURL = getCompleteShortenedURL(shortenedURL.alias);
    await generateQRCode(completeURL);
    setDisplayDialog(true);
  };

  return (
    <>
      <URLShortenerResultActionsQRCodeDialog
        isOpen={displayDialog}
        onOpenChange={setDisplayDialog}
        qrResult={encodedQR}
      />
      <IconButton
        aria-label="Create QR Code"
        onClick={handleQRCodeGeneration}
        icon={
          isLoading ? (
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
              <rect x="4" y="4" width="6" height="6" rx="1" />
              <line x1="7" y1="17" x2="7" y2="17.01" />
              <rect x="14" y="4" width="6" height="6" rx="1" />
              <line x1="7" y1="7" x2="7" y2="7.01" />
              <rect x="4" y="14" width="6" height="6" rx="1" />
              <line x1="17" y1="7" x2="17" y2="7.01" />
              <line x1="14" y1="14" x2="17" y2="14" />
              <line x1="20" y1="14" x2="20" y2="14.01" />
              <line x1="14" y1="14" x2="14" y2="17" />
              <line x1="14" y1="20" x2="17" y2="20" />
              <line x1="17" y1="17" x2="20" y2="17" />
              <line x1="20" y1="17" x2="20" y2="20" />
            </svg>
          )
        }
      />
    </>
  );
};

export default URLShortenerResultActionsQRCode;
