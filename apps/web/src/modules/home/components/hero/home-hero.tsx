'use client';
import React, { useEffect } from 'react';
import HomeHeroShortenDemo from './home-hero-shorten-demo';

const HomeHero: React.FC = () => {
  useEffect(() => {
    fetch('/api/shorten-link')
      .then((res) => res.json())
      .then((data) => console.log({ data }));
  }, []);

  return (
    <div className="mx-auto max-w-screen-xl py-8 text-center lg:py-16">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-neutral-50 md:text-5xl lg:text-6xl">
        Your Fast and Reliable URL Shortener
      </h1>

      <p className="mb-6 text-lg font-normal text-neutral-700 dark:text-neutral-300 sm:px-16 lg:text-xl xl:px-48">
        Make your links shorter, smarter, and shareable in a breeze!. Customize, track, and optimize your links
        effortlessly.
      </p>

      {/* Shorten Link Demo */}
      <HomeHeroShortenDemo />
    </div>
  );
};

export default HomeHero;
