import React from 'react';
import URLShortenerProtectionForm from './url-shortener-protection-form';

type URLShortenerProtectionProps = {
  alias: string;
};

const URLShortenerProtection: React.FC<URLShortenerProtectionProps> = (props) => {
  const { alias } = props;
  return (
    <div className="mx-auto flex max-w-xl flex-col gap-2 rounded border p-4 text-center shadow md:p-6">
      <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Access Link</h1>
      <p>Enter the link password to access this protected URL.</p>
      <URLShortenerProtectionForm alias={alias} />
    </div>
  );
};

export default URLShortenerProtection;
