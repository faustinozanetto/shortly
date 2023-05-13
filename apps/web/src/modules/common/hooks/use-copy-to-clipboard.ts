import { useEffect, useState } from 'react';

const useCopyToClipboard = (): [string, (text: string) => void] => {
  const [copiedText, setCopiedText] = useState<string>('');

  const copyToClipboard = (text: string) => {
    if (!navigator.clipboard) {
      fallbackCopyToClipboard(text);
      return;
    }

    navigator.clipboard
      .writeText(text)
      .then(() => setCopiedText(text))
      .catch((error) => console.error('Failed to copy text to clipboard:', error));
  };

  const fallbackCopyToClipboard = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand('copy');
      setCopiedText(text);
    } catch (error) {
      console.error('Failed to copy text to clipboard:', error);
    }

    document.body.removeChild(textArea);
  };

  useEffect(() => {
    const resetCopiedText = () => setCopiedText('');

    document.addEventListener('copy', resetCopiedText);

    return () => {
      document.removeEventListener('copy', resetCopiedText);
    };
  }, []);

  return [copiedText, copyToClipboard];
};

export default useCopyToClipboard;
