import { useEffect, useState } from 'react';

const useCopyToClipboard = () => {
  const [copiedText, setCopiedText] = useState<string>('');

  const copyToClipboard = async (text: string) => {
    if (typeof ClipboardItem && navigator.clipboard.write) {
      const blob = new Blob([text], { type: 'text/plain' });
      const res = new ClipboardItem({ [blob.type]: blob });
      navigator.clipboard.write([res]);
    } else {
      navigator.clipboard.writeText(text);
    }
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
