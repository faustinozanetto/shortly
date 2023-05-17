import { useEffect, useState } from 'react';

const useCopyToClipboard = () => {
  const [copiedText, setCopiedText] = useState<string>('');

  const copyToClipboard = async (text: string) => {
    if (!navigator.clipboard) {
      throw new Error('Copy to clipboard is not supported!');
    }

    await navigator.clipboard.writeText(text);
    setCopiedText(text);
  };

  useEffect(() => {
    const resetCopiedText = () => setCopiedText('');

    document.addEventListener('copy', resetCopiedText);

    return () => {
      document.removeEventListener('copy', resetCopiedText);
    };
  }, []);

  return { copyToClipboard, copiedText };
};

export default useCopyToClipboard;
