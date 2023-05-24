import React from 'react';

import { Session } from 'next-auth';
import URLShortenerGenerator from './generator/url-shortener-generator';

type URLShortenerProps = {
  user: Session['user'];
};

const URLShortener: React.FC<URLShortenerProps> = (props) => {
  const { user } = props;
  return (
    <div className="flex flex-col gap-2 md:gap-4">
      <URLShortenerGenerator user={user} />
    </div>
  );
};

export default URLShortener;
