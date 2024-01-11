'use client';
import React, { useState } from 'react';

import { motion } from 'framer-motion';
import { HomeStatsData } from '@modules/home/types/home.types';
import { HOME_STATS } from '@modules/home/lib/home.lib';
import StatsCard from '@modules/common/components/stats/stats-card';
import { getFormattedNumberIntoThousands } from '@modules/common/lib/common.lib';

type HomeStatsProps = {
  stats: HomeStatsData;
};

type StatsMapRecord = Record<number, { stat: number; unit: string }>;

const HomeStats: React.FC<HomeStatsProps> = (props) => {
  const { stats } = props;
  const { activeUsers, linksShortened, linksClicked, uptimeServer } = stats;

  const [statsMap, setStatsMap] = useState<StatsMapRecord>(() => {
    const map: StatsMapRecord = {};
    map[0] = {
      stat: getFormattedNumberIntoThousands(activeUsers)[0],
      unit: getFormattedNumberIntoThousands(activeUsers)[1],
    };
    map[1] = {
      stat: getFormattedNumberIntoThousands(linksShortened)[0],
      unit: getFormattedNumberIntoThousands(linksShortened)[1],
    };
    map[2] = {
      stat: getFormattedNumberIntoThousands(linksClicked)[0],
      unit: getFormattedNumberIntoThousands(linksClicked)[1],
    };
    map[3] = { stat: getFormattedNumberIntoThousands(uptimeServer)[0], unit: '%' };
    return map;
  });

  return (
    <section className="bg-primary/70 w-full" id="stats">
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-10 md:px-20 md:py-24">
        <motion.h2
          className="mb-4 text-start text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl"
          initial={{ opacity: 0, translateY: -20 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 0.15, duration: 0.35 }}
        >
          The numbers speak for themselves
        </motion.h2>

        <motion.p
          className="mb-4 md:mb-8 md:text-lg"
          initial={{ opacity: 0, translateX: -20 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, translateX: 0 }}
          transition={{ delay: 0.25, duration: 0.35 }}
        >
          Make your links shorter, smarter, and shareable in a breeze!. Customize, track, and optimize your links
          effortlessly. Boost your brand and engage your audience with shortened links that leave a lasting impression.
        </motion.p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {HOME_STATS.map((stat, index) => {
            return (
              <motion.div
                key={`stat-${index}`}
                initial={{ opacity: 0, translateY: -20 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, translateY: 0 }}
                transition={{ delay: 0.15 * index + 0.45, duration: 0.35 }}
              >
                <StatsCard {...stat} stat={statsMap[index].stat} unit={statsMap[index].unit} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeStats;
