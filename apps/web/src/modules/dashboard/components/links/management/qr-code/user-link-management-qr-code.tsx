import React from 'react';
import URLShortenerResultActionsQRCodeDialog from '@modules/url-shortener/components/result/qr-code/url-shortener-result-qr-code-dialog';

type UserLinkManagementQRCodeProps = {
  encodedQR: string | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const UserLinkManagementQRCode: React.FC<UserLinkManagementQRCodeProps> = (props) => {
  const { encodedQR, isOpen, onOpenChange } = props;

  return <URLShortenerResultActionsQRCodeDialog isOpen={isOpen} onOpenChange={onOpenChange} qrResult={encodedQR} />;
};

export default UserLinkManagementQRCode;
