import React from 'react';

import URLShortenerGeneratorForm from './url-shortener-generator-form';
import { Session } from 'next-auth';

type URLShortenerGeneratorProps = {
  user: Session['user'];
};

const URLShortenerGenerator: React.FC<URLShortenerGeneratorProps> = (props) => {
  const { user } = props;
  return (
    <div className="mx-auto max-w-xl gap-2 rounded border p-4 text-center shadow md:gap-4 md:p-6">
      <h1 className="mb-2 text-3xl font-extrabold tracking-tight md:text-4xl">Shorten your Link</h1>
      <p>Enter your desired URL to shorten and include a custom alias to identify the link if you want!</p>
      <URLShortenerGeneratorForm user={user} />
    </div>
  );
};

export default URLShortenerGenerator;
