'use client';
import React from 'react';

import { useURLShortenerContext } from '@modules/url-shortener/hooks/use-url-shortener-context';
import { AnimatePresence, motion } from 'framer-motion';
import { getCompleteShortenedURL } from '@modules/url-shortener/lib/url-shortener.lib';
import Link from 'next/link';
import URLShortenerResultActions from './actions/url-shortener-result-actions';

const URLShortenerResultURL: React.FC = () => {
  const { shortenedURL } = useURLShortenerContext();

  const completeURL = getCompleteShortenedURL(shortenedURL?.alias ?? '');

  return (
    <AnimatePresence>
      {shortenedURL ? (
        <motion.div
          className="bg-background-100 dark:bg-background-900 border-background-300 dark:border-background-800 mt-2 flex items-center justify-between gap-2 rounded-lg border-2 p-2 shadow-lg"
          initial={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0, translateY: -20 }}
        >
          <Link
            href={completeURL}
            prefetch={false}
            target="_blank"
            className="hover:text-primary-700 truncate font-medium hover:cursor-pointer dark:hover:text-purple-400"
          >
            {completeURL}
          </Link>

          <URLShortenerResultActions />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default URLShortenerResultURL;
