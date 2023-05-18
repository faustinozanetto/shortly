import React from 'react';
import URLShortenerResultActionsCopy from './url-shortener-result-actions-copy';
import URLShortenerResultActionsQRCode from './url-shortener-result-actions-qr-code';

const URLShortenerResultActions: React.FC = () => {
  return (
    <div className="flex gap-2">
      <URLShortenerResultActionsQRCode />
      <URLShortenerResultActionsCopy />
    </div>
  );
};

export default URLShortenerResultActions;
