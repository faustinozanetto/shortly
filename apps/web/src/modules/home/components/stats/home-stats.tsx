'use client';
import React from 'react';

import HomeStatsCard, { HomeStatsCardProps } from './home-stats-card';
import { motion } from 'framer-motion';
import { HomeStatsData } from '@modules/home/types/home.types';
import { HOME_STATS, getHomeStatsUnit } from '@modules/home/lib/home.lib';

type HomeStatsProps = {
  stats: HomeStatsData;
};

const HomeStats: React.FC<HomeStatsProps> = (props) => {
  const { stats } = props;
  const { activeUsers, linksShortened, linksClicked, uptimeServer } = stats;

  const statsMap: Record<number, { stat: number; unit: string }> = {};
  statsMap[0] = { stat: getHomeStatsUnit(activeUsers)[0], unit: getHomeStatsUnit(activeUsers)[1] };
  statsMap[1] = { stat: getHomeStatsUnit(linksShortened)[0], unit: getHomeStatsUnit(linksShortened)[1] };
  statsMap[2] = { stat: getHomeStatsUnit(linksClicked)[0], unit: getHomeStatsUnit(linksClicked)[1] };
  statsMap[3] = { stat: getHomeStatsUnit(uptimeServer)[0], unit: '%' };

  return (
    <section className="bg-primary-300 dark:bg-primary-900 w-full" id="shorten">
      <div className="relative mx-auto my-8 max-w-[85rem] px-4 sm:px-6 md:my-16 lg:my-20 lg:px-8">
        <motion.h2
          className="mb-4 text-start text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-4xl md:text-5xl"
          initial={{ opacity: 0, translateY: -20 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 0.15, duration: 0.35 }}
        >
          The numbers speak for themselves
        </motion.h2>

        <motion.p
          className="mb-4 text-neutral-800 dark:text-neutral-100 md:mb-8 md:text-lg"
          initial={{ opacity: 0, translateX: -20 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, translateX: 0 }}
          transition={{ delay: 0.25, duration: 0.35 }}
        >
          Make your links shorter, smarter, and shareable in a breeze!. Customize, track, and optimize your links
          effortlessly. Boost your brand and engage your audience with shortened links that leave a lasting impression.
        </motion.p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:items-center md:gap-8">
          {HOME_STATS.map((stat, index) => {
            return (
              <motion.div
                key={`stat-${index}`}
                initial={{ opacity: 0, translateY: -20 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, translateY: 0 }}
                transition={{ delay: 0.15 * index + 0.45, duration: 0.35 }}
              >
                <HomeStatsCard {...stat} stat={statsMap[index].stat} unit={statsMap[index].unit} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeStats;
