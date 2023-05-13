import React from 'react';

import HomeStatsCard, { HomeStatsCardProps } from './home-stats-card';

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
        <h2 className="mb-4 text-center text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-4xl md:mb-8 md:text-start md:text-5xl">
          The numbers speak for themselves
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:items-center md:gap-8">
          {HOME_STATS.map((stat, index) => {
            return <HomeStatsCard key={`stat-${index}`} {...stat} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeStats;
