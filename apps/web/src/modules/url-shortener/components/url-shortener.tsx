import React from 'react';

import URLShortenerForm from './url-shortener-form';
import { Session } from 'next-auth';

type URLShortenerProps = {
  user: Session['user'];
};

const URLShortener: React.FC<URLShortenerProps> = (props) => {
  const { user } = props;
  return (
    <div className="mx-auto max-w-xl space-y-2 rounded-lg bg-neutral-100 p-4 text-center shadow-lg dark:bg-neutral-800 md:space-y-4 md:p-6">
      <h1 className=" text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-4xl md:text-5xl">
        Shorten your Link
      </h1>
      <p className="text-neutral-800 dark:text-neutral-100 md:text-lg">
        Enter your desired URL to shorten and include a custom alias to identify the link if you want!
      </p>
      <URLShortenerForm user={user} />
    </div>
  );
};

export default URLShortener;
