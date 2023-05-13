import React from 'react';

import HomeStatsCard, { HomeStatsCardProps } from './home-stats-card';
import { m } from 'framer-motion';

const HOME_STATS: HomeStatsCardProps[] = [
  {
    title: 'Active Users',
    stat: '10',
    unit: 'k',
    description: ' Lorem ipsum dolor sit.',
  },
  {
    title: 'Links Shortened',
    stat: '20',
    unit: 'k',
    description: ' Lorem ipsum dolor sit.',
  },
  {
    title: 'Active Users',
    stat: '100',
    unit: 'k',
    description: ' Lorem ipsum dolor sit.',
  },
  {
    title: 'Uptime Server',
    stat: '99',
    unit: '%',
    description: ' Lorem ipsum dolor sit.',
  },
];

const HomeStats: React.FC = () => {
  return (
    <section className="bg-primary-300 dark:bg-primary-900 w-full" id="shorten">
      <div className="relative mx-auto my-8 max-w-[85rem] px-4 sm:px-6 md:my-16 lg:my-20 lg:px-8">
        <m.h2
          className="mb-4 text-start text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-4xl md:text-5xl"
          initial={{ opacity: 0, translateY: -20 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 0.15, duration: 0.35 }}
        >
          The numbers speak for themselves
        </m.h2>

        <m.p
          className="mb-4 text-neutral-800 dark:text-neutral-100 md:mb-8 md:text-lg"
          initial={{ opacity: 0, translateX: -20 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, translateX: 0 }}
          transition={{ delay: 0.25, duration: 0.35 }}
        >
          Make your links shorter, smarter, and shareable in a breeze!. Customize, track, and optimize your links
          effortlessly. Boost your brand and engage your audience with shortened links that leave a lasting impression.
        </m.p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:items-center md:gap-8">
          {HOME_STATS.map((stat, index) => {
            return (
              <m.div
                key={`stat-${index}`}
                initial={{ opacity: 0, translateY: -20 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, translateY: 0 }}
                transition={{ delay: 0.15 * index + 0.45, duration: 0.35 }}
              >
                <HomeStatsCard {...stat} />
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeStats;
