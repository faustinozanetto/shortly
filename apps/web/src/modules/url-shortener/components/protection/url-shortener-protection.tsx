import React from 'react';
import URLShortenerProtectionForm from './url-shortener-protection-form';

type URLShortenerProtectionProps = {
  alias: string;
};

const URLShortenerProtection: React.FC<URLShortenerProtectionProps> = (props) => {
  const { alias } = props;
  return (
    <div className="bg-foreground mx-auto max-w-xl space-y-2 rounded-lg p-4 text-center shadow-lg md:space-y-4 md:p-6">
      <h1 className=" text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-4xl md:text-5xl">
        Access Link
      </h1>
      <p className="text-neutral-800 dark:text-neutral-100 md:text-lg">
        Enter the link password to access this protected URL.
      </p>
      <URLShortenerProtectionForm alias={alias} />
    </div>
  );
};

export default URLShortenerProtection;
