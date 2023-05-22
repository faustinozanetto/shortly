'use client';
import React from 'react';

import { useURLShortenerContext } from '@modules/url-shortener/hooks/use-url-shortener-context';
import { AnimatePresence, motion } from 'framer-motion';
import URLShortenerResultURL from './url-shortener-result-url';

const URLShortenerResult: React.FC = () => {
  const { shortenedURL } = useURLShortenerContext();

  return (
    <AnimatePresence>
      {shortenedURL ? (
        <motion.div
          className="bg-background-100 dark:bg-background-800 mx-auto max-w-xl space-y-2 rounded-lg p-4 text-center shadow-lg md:space-y-4 md:p-6"
          initial={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0, translateY: -20 }}
        >
          <h3 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 md:text-3xl">
            Generated Result
          </h3>

          <p>Below is the generated URL with the alias your provided or a randomly generated one.</p>

          <URLShortenerResultURL />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default URLShortenerResult;
