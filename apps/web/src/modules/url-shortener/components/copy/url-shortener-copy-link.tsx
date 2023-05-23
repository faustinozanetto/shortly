'use client';
import useCopyToClipboard from '@modules/common/hooks/use-copy-to-clipboard';
import { useToast } from '@modules/toasts/hooks/use-toast';
import { getCompleteShortenedURL } from '@modules/url-shortener/lib/url-shortener.lib';
import { Link } from '@prisma/client';
import React, { useState } from 'react';

type URLShortenerCopyLinkProps = {
  link: Link | null;
  renderButton: (onClick: () => void, isCopyingLoading: boolean) => JSX.Element;
};

const URLShortenerCopyLink: React.FC<URLShortenerCopyLinkProps> = (props) => {
  const { link, renderButton } = props;
  const [isCopyingLoading, setIsCopyingLoading] = useState<boolean>(false);

  const { toast } = useToast();
  const { copyToClipboard } = useCopyToClipboard();

  const handleURLCopy = async () => {
    if (!link) return;

    try {
      setIsCopyingLoading(true);
      const completeURL = getCompleteShortenedURL(link.alias);
      await copyToClipboard(completeURL);
      setIsCopyingLoading(false);
      toast({ variant: 'success', content: 'URL copied successfully!' });
    } catch (error) {
      setIsCopyingLoading(false);
      toast({ variant: 'error', content: 'An error occurred while copying!' });
    }
  };

  return renderButton(handleURLCopy, isCopyingLoading);
};

export default URLShortenerCopyLink;
