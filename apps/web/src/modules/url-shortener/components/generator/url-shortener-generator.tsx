import React from 'react';

import URLShortenerGeneratorForm from './url-shortener-generator-form';
import { Session } from 'next-auth';

type URLShortenerGeneratorProps = {
  user: Session['user'];
};

const URLShortenerGenerator: React.FC<URLShortenerGeneratorProps> = (props) => {
  const { user } = props;
  return (
    <div className="bg-background-100 dark:bg-background-800 mx-auto max-w-xl space-y-2 rounded-lg p-4 text-center shadow-lg md:space-y-4 md:p-6">
      <h1 className=" text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-4xl md:text-5xl">
        Shorten your Link
      </h1>
      <p className="text-neutral-800 dark:text-neutral-100 md:text-lg">
        Enter your desired URL to shorten and include a custom alias to identify the link if you want!
      </p>
      <URLShortenerGeneratorForm user={user} />
    </div>
  );
};

export default URLShortenerGenerator;
