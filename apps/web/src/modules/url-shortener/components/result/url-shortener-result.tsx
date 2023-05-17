'use client';
import React from 'react';

import { useURLShortenerContext } from '@modules/url-shortener/hooks/use-url-shortener-context';
import { AnimatePresence, motion } from 'framer-motion';
import { getCompleteShortenedURL } from '@modules/url-shortener/lib/url-shortener.lib';
import Link from 'next/link';
import URLShortenerResultActions from './actions/url-shortener-result-actions';

const URLShortenerResult: React.FC = () => {
  const { shortenedURL } = useURLShortenerContext();

  const completeURL = getCompleteShortenedURL(shortenedURL?.alias ?? '');

  return (
    <AnimatePresence>
      {shortenedURL ? (
        <motion.div
          className="bg-background-100 dark:bg-background-800 mx-auto w-full max-w-xl rounded-lg p-4 shadow-lg md:p-6"
          initial={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0, translateY: -20 }}
        >
          <h3 className="text-xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 md:text-2xl">
            Generated Result
          </h3>

          <p>Below is the generated URL with the alias your provided or a randomly generated one.</p>

          <div className="bg-background-200 dark:bg-background-900 mt-2 flex items-center justify-between gap-2 rounded-lg p-2">
            <Link
              href={completeURL}
              target="_blank"
              prefetch={false}
              className="hover:text-primary-700 truncate font-medium hover:cursor-pointer dark:hover:text-purple-400"
            >
              {completeURL}
            </Link>

            <URLShortenerResultActions />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default URLShortenerResult;
