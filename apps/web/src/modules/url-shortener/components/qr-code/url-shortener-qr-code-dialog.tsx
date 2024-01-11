'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@modules/ui/components/dialog/dialog';
import React, { useRef } from 'react';
import Image from 'next/image';
import { Button } from '@modules/ui/components/button/button';
import { toPng } from 'html-to-image';
import { Options } from 'html-to-image/lib/types';

type URLShortenerQRCodeDialog = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  qrResult: string | null;
};

const URLShortenerQRCodeDialog: React.FC<URLShortenerQRCodeDialog> = (props) => {
  const { isOpen, onOpenChange, qrResult } = props;

  const imageRef = useRef<HTMLImageElement>(null);

  const handleQRCodeSave = async () => {
    if (!imageRef.current) return;

    const options: Options = {
      skipFonts: true,
    };

    const imageResult = await toPng(imageRef.current, options);
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = imageResult;
    link.click();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>URL QR Code</DialogTitle>
          <DialogDescription>Download the generated qr code image for your shortened URL.</DialogDescription>
        </DialogHeader>
        {qrResult ? (
          <Image
            ref={imageRef}
            src={qrResult}
            alt="QR Code"
            width={250}
            height={250}
            className="mx-auto rounded border"
          />
        ) : null}
        <DialogFooter>
          <Button className="w-full" onClick={handleQRCodeSave} aria-label="Save Image">
            Save Image
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default URLShortenerQRCodeDialog;
