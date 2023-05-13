import { Button } from '@shortly/ui';
import React from 'react';

const HomeHero: React.FC = () => {
  return (
    <section className="w-full px-4 md:px-0" id="hero">
      <div className="mx-auto max-w-screen-xl py-8 text-center lg:py-16">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-neutral-50 md:text-5xl lg:text-6xl">
          Your Fast and Reliable URL Shortener
        </h1>
        <p className="mb-6 text-lg font-normal text-neutral-700 dark:text-neutral-300 sm:px-16 lg:text-xl xl:px-48">
          Make your links shorter, smarter, and shareable in a breeze!. Customize, track, and optimize your links
          effortlessly.
        </p>

        <div className="flex gap-4">
          <Button>Get Started Now</Button>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
