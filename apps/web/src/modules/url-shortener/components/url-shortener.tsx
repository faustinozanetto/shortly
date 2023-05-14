import React from 'react';

import URLShortenerForm from './url-shortener-form';

const URLShortener: React.FC = () => {
  return (
    <div className="mx-auto my-6 max-w-[85rem] rounded-lg bg-neutral-100 p-4 px-4 shadow-lg dark:bg-neutral-800 sm:px-6 md:my-14 md:max-w-2xl md:p-6 lg:my-20">
      <div className="flex flex-col gap-4">
        <h1 className="text-center text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-4xl md:text-5xl">
          Shorten your Link
        </h1>
        <p className="max-w-md text-center text-neutral-800 dark:text-neutral-100 md:text-lg">
          Enter your desired URL to shorten and include a custom alias to identify the link if you want!
        </p>
        <URLShortenerForm />
      </div>
    </div>
  );
};

export default URLShortener;
