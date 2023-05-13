'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { HOME_FEATURES } from '@modules/home/lib/home.lib';
import HomeFeatureCard from './home-feature-card';

const HomeFeatures: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<{ index: number; image: string }>({
    index: 0,
    image: HOME_FEATURES[0].image,
  });

  return (
    <section className="w-full bg-neutral-50 dark:bg-neutral-900" id="features">
      <div className="md:my-22 relative mx-auto my-14 max-w-[85rem] overflow-x-hidden px-4 sm:px-6 lg:my-32 lg:px-8">
        <div className="relative z-10 grid gap-4 md:grid-cols-2 md:items-start md:gap-8 xl:gap-20">
          {/* Left */}
          <div className="rounded-md bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800">
            <Image
              className="w-full rounded-md"
              src={selectedFeature.image}
              alt="Image Description"
              priority
              title="Hero Picture"
              width={500}
              height={500}
            />
          </div>

          {/* Right */}
          <div>
            <h2 className="leading-2 block text-3xl font-bold text-neutral-800 dark:text-white sm:text-4xl lg:text-5xl">
              These are just <span className="text-secondary-500 dark:text-secondary-600">some</span> of our features
            </h2>
            {/* Features Nav */}
            <nav className="mt-4 grid gap-2 md:mt-6 md:gap-4" aria-label="Tabs" role="tablist">
              {HOME_FEATURES.map((feature, index) => {
                return (
                  <HomeFeatureCard
                    key={`feature-${index}`}
                    data={feature}
                    isSelected={index === selectedFeature.index}
                    onClick={() => setSelectedFeature({ index, image: feature.image })}
                  />
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
