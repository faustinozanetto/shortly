import { useToast } from '@modules/toasts/hooks/use-toast';
import { useState } from 'react';
import qrcode from 'qrcode';

const useQRCode = (options?: qrcode.QRCodeToDataURLOptions) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [encodedQR, setEncodedQR] = useState<string | null>(null);

  const generateQRCode = async (originalURL: string) => {
    if (encodedQR) return;

    try {
      setIsLoading(true);
      const result = await qrcode.toDataURL(originalURL, options);
      setEncodedQR(result);
      toast({ variant: 'success', content: 'QR Code generated successfully!' });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast({ variant: 'error', content: 'An error occurred while generating QR Code!' });
    }
  };

  return {
    generateQRCode,
    encodedQR,
    isLoading,
  };
};

export default useQRCode;
