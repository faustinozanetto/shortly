'use client';
import { buttonVariants } from '@modules/ui/components/button/button';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@modules/ui/lib/ui.lib';

const HomeHero: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden" id="hero">
      {/* Gradients */}
      <div aria-hidden="true" className="animate-hero-background absolute inset-0 left-1/2 -translate-x-1/2 transform">
        <div className="rounded-fulls h-[50rem] w-[90rem] origin-top-left -translate-x-[15rem] -rotate-12 bg-gradient-to-tl from-violet-300 via-violet-100 to-purple-200 blur-3xl dark:from-violet-500/50 dark:via-purple-600/50 dark:to-violet-400/40 "></div>
      </div>
      {/* Content */}
      <div className="mx-auto my-6 max-w-[85rem] px-4 sm:px-6 md:my-14 lg:my-20 lg:px-8">
        <div className="relative z-10 grid gap-4 md:grid-cols-2 md:items-center md:gap-8 xl:gap-20">
          {/* Left */}
          <div>
            <motion.h1
              className="leading-2 block text-4xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl"
              initial={{ opacity: 0, translateY: -20 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, translateY: 0 }}
              transition={{ delay: 0.15, duration: 0.35 }}
            >
              Your <span className="text-primary underline decoration-8">Fast</span> and{' '}
              <span className="text-primary">Reliable</span> URL Shortener
            </motion.h1>
            <motion.p
              className="mt-3 md:text-lg"
              initial={{ opacity: 0, translateY: -20 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, translateY: 0 }}
              transition={{ delay: 0.25, duration: 0.35 }}
            >
              Make your links shorter, smarter, and shareable in a breeze!. Customize, track, and optimize your links
              effortlessly. Boost your brand and engage your audience with shortened links.
            </motion.p>

            {/* CTA Buttos */}
            <motion.div
              className="mt-4 grid w-full gap-4 md:inline-flex"
              initial={{ opacity: 0, translateX: -20 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, translateX: 0 }}
              transition={{ delay: 0.25, duration: 0.35 }}
            >
              <Link href="/shorten" className={cn(buttonVariants({ size: 'lg' }))}>
                Get Started Now
              </Link>
              <Link href="/sign-in" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}>
                Sign In for Free
              </Link>
            </motion.div>
          </div>

          {/* Right */}
          <motion.div
            className="ml-4"
            initial={{ opacity: 0, translateX: 20 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{ delay: 0.35, duration: 0.35 }}
          >
            <Image
              className="w-full rounded"
              src="assets/hero-picture.svg"
              alt="Image Description"
              priority
              title="Hero Picture"
              width={500}
              height={500}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
