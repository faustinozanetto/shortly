'use client';
import { Link } from '@prisma/client';
import React, { useState } from 'react';

type URLShortenerContextProps = {
  shortenedURL: Link | null;
  setShortenedURL: (url: Link) => void;
};

const initialState: URLShortenerContextProps = {
  shortenedURL: null,
  setShortenedURL: () => {},
};

export const URLShortenerContext = React.createContext<URLShortenerContextProps>(initialState);

type URLShortenerProviderProps = {
  children: React.ReactNode;
};

const URLShortenerProvider: React.FC<URLShortenerProviderProps> = (props) => {
  const { children } = props;

  const [shortenedURL, setShortenedURL] = useState<Link | null>(null);

  return (
    <URLShortenerContext.Provider value={{ shortenedURL, setShortenedURL }}>{children}</URLShortenerContext.Provider>
  );
};

export default URLShortenerProvider;
