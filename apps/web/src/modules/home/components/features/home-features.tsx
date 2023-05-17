'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { HOME_FEATURES } from '@modules/home/lib/home.lib';
import HomeFeatureCard from './home-feature-card';
import { motion } from 'framer-motion';

const HomeFeatures: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<{ index: number; image: string }>({
    index: 0,
    image: HOME_FEATURES[0].image,
  });

  return (
    <section className="bg-background-50 dark:bg-background-900 w-full" id="features">
      <div className="md:my-22 relative mx-auto my-14 max-w-[85rem] px-4 sm:px-6 lg:my-32 lg:px-8">
        <div className="relative z-10 grid gap-4 md:grid-cols-2 md:items-start md:gap-8 xl:gap-20">
          {/* Left */}
          <motion.div
            className="bg-background-200 dark:bg-background-800 rounded-md p-4 shadow-lg"
            initial={{ opacity: 0, translateY: -20 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 0.15, duration: 0.35 }}
          >
            <Image
              className="w-full rounded-md"
              src={selectedFeature.image}
              alt="Image Description"
              priority
              title="Hero Picture"
              width={500}
              height={500}
            />
          </motion.div>

          {/* Right */}
          <div>
            <motion.h2
              className="leading-2 mt-2 block text-3xl font-bold text-neutral-800 dark:text-white sm:text-4xl md:mt-0 lg:text-5xl"
              initial={{ opacity: 0, translateX: 20 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, translateX: 0 }}
              transition={{ delay: 0.25, duration: 0.35 }}
            >
              These are just <span className="text-secondary-500 dark:text-secondary-600">some</span> of our features
            </motion.h2>
            {/* Features Nav */}
            <nav className="mt-4 grid gap-2 md:mt-6 md:gap-4" aria-label="Tabs" role="tablist">
              {HOME_FEATURES.map((feature, index) => {
                return (
                  <motion.div
                    key={`feature-${index}`}
                    initial={{ opacity: 0, translateY: -20 }}
                    viewport={{ once: true }}
                    whileInView={{ opacity: 1, translateY: 0 }}
                    transition={{ delay: 0.15 * index + 0.35, duration: 0.35 }}
                  >
                    <HomeFeatureCard
                      data={feature}
                      isSelected={index === selectedFeature.index}
                      onClick={() => setSelectedFeature({ index, image: feature.image })}
                    />
                  </motion.div>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeFeatures;
