'use client';
import React from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { getCompleteShortenedURL } from '@modules/url-shortener/lib/url-shortener.lib';
import Link from 'next/link';
import URLShortenerResultActions from './actions/url-shortener-result-actions';
import { useUrlShortenerStore } from '@modules/url-shortener/state/url-shortener.slice';

const URLShortenerResultURL: React.FC = () => {
  const { shortenedURL } = useUrlShortenerStore();

  const completeURL = getCompleteShortenedURL(shortenedURL?.alias ?? '');

  return (
    <AnimatePresence>
      {shortenedURL ? (
        <motion.div
          className="bg-background mt-2 flex items-center justify-between gap-2 rounded border p-2 shadow"
          initial={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0, translateY: -20 }}
        >
          <Link
            href={completeURL}
            prefetch={false}
            target="_blank"
            className="hover:text-primary max-w-[265px] truncate font-medium hover:cursor-pointer md:max-w-none"
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
