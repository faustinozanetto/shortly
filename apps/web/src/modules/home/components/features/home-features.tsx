'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { HOME_FEATURES } from '@modules/home/lib/home.lib';
import HomeFeatureCard from './home-feature-card';
import { AnimatePresence, motion } from 'framer-motion';
import { Accordion } from '@modules/ui/components/accordion/accordion';

const HomeFeatures: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<number>(0);

  return (
    <section className="w-full" id="stats">
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-10 md:px-20 md:py-24">
        {/* Text and Title */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            className="font-display text-4xl font-extrabold leading-tight sm:text-5xl sm:leading-tight"
            initial={{ opacity: 0, translateX: 20 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{ delay: 0.25, duration: 0.35 }}
          >
            These are just <span className="text-primary">some</span> of <br /> our features
          </motion.h2>
          <p className="mt-4 sm:text-lg">
            Shortly is packed with a wide array of features to explore and utilize. From robust analytics for gaining
            valuable insights to intuitive task management tools for staying organized, Shortly has something for
            everyone.
          </p>
        </div>

        {/* Featues */}
        <div className="bg-background/20 relative z-20 my-10 w-full overflow-hidden rounded border shadow">
          {/* Gradients */}
          <div aria-hidden="true" className="absolute inset-0 left-1/2 -translate-x-1/2 transform">
            <div className="rounded-fulls h-[50rem] w-[90rem] origin-top-left -translate-x-[15rem] -rotate-12 bg-gradient-to-tl from-purple-300 via-purple-100 to-violet-200 blur-3xl dark:from-purple-500/50 dark:via-violet-600/50 dark:to-purple-400/40 "></div>
          </div>

          <div className="relative z-30 grid grid-cols-1 gap-10 p-6 backdrop-blur-lg lg:grid-cols-3">
            <Accordion
              type="single"
              collapsible
              defaultValue={selectedFeature.toString()}
              onValueChange={(value) => setSelectedFeature(Number(value))}
              className="flex flex-col"
            >
              {HOME_FEATURES.map((feature, index) => {
                return <HomeFeatureCard key={feature.title} index={index} data={feature} />;
              })}
            </Accordion>

            {/* Feature Image */}
            <motion.div
              className="flex items-center justify-center md:p-6 lg:col-span-2"
              initial={{ opacity: 0, translateY: -20 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, translateY: 0 }}
              transition={{ delay: 0.15, duration: 0.35 }}
            >
              <AnimatePresence mode="wait">
                {HOME_FEATURES.map((feature, index) => {
                  if (selectedFeature === index) {
                    return (
                      <motion.div
                        key={feature.title}
                        initial={{
                          y: 15,
                          opacity: 0,
                        }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{
                          y: -15,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.2,
                          stiffness: 150,
                          damping: 10,
                        }}
                        className="w-full overflow-hidden"
                      >
                        <Image
                          className="aspect-video w-full rounded"
                          src={feature.image}
                          alt="Image Description"
                          title="Hero Picture"
                          width={450}
                          height={450}
                        />
                      </motion.div>
                    );
                  }
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeFeatures;
