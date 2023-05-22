'use client';
import React from 'react';
import HomeShortenForm from '@modules/home/components/shorten/home-shorten-form';
import { motion } from 'framer-motion';
import URLShortenerProvider from '@modules/url-shortener/context/url-shortener-context';
import URLShortenerResultURL from '@modules/url-shortener/components/result/url-shortener-result-url';

const HomeShorten: React.FC = () => {
  return (
    <URLShortenerProvider>
      <section className="bg-primary-300 dark:bg-primary-900 w-full" id="shorten">
        <div className="relative mx-auto my-8 max-w-[85rem] px-4 sm:px-6 md:my-16 lg:my-20 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2 md:items-center md:gap-8 xl:gap-20">
            {/* Left */}
            <div>
              <motion.h2
                className="text-center text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-4xl md:text-start md:text-5xl"
                initial={{ opacity: 0, translateY: -20 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, translateY: 0 }}
                transition={{ delay: 0.15, duration: 0.35 }}
              >
                Shorten your Link Now
              </motion.h2>

              <motion.p
                className="mt-3 text-center text-neutral-800 dark:text-neutral-100 md:text-start md:text-lg"
                initial={{ opacity: 0, translateY: -20 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, translateY: 0 }}
                transition={{ delay: 0.25, duration: 0.35 }}
              >
                Discover the convenience of our URL shortener! You can either give it a try directly here, where you can
                effortlessly generate shortened URLs, or visit our special page dedicated to creating custom shortened
                links.
              </motion.p>
            </div>

            {/* Right */}
            <motion.div
              className="gap-2"
              initial={{ opacity: 0, translateX: 20 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, translateX: 0 }}
              transition={{ delay: 0.25, duration: 0.35 }}
            >
              <HomeShortenForm />
              <URLShortenerResultURL />
            </motion.div>
          </div>
        </div>
      </section>
    </URLShortenerProvider>
  );
};

export default HomeShorten;
