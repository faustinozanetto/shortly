import Button from '@modules/ui/components/button/button';
import React from 'react';
import Image from 'next/image';

const HomeHero: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden" id="hero">
      {/* Gradients */}
      <div aria-hidden="true" className="absolute inset-0 left-1/2 -translate-x-1/2 transform">
        <div className="rounded-fulls dark:from-primary-500/50 dark:via-secondary-600/50 dark:to-primary-400/40 from-primary-300 via-primary-100 to-secondary-200 h-[50rem] w-[90rem] origin-top-left -translate-x-[15rem] -rotate-12 bg-gradient-to-tl blur-3xl "></div>
      </div>
      {/* Content */}
      <div className="mx-auto my-6 max-w-[85rem] px-4 sm:px-6 md:my-14 lg:my-20 lg:px-8">
        <div className="relative z-10 grid gap-4 md:grid-cols-2 md:items-center md:gap-8 xl:gap-20">
          {/* Left */}
          <div>
            <h1 className="leading-2 block text-4xl font-bold text-neutral-800 dark:text-white sm:text-5xl lg:text-6xl">
              Your <span className="text-secondary-500 dark:text-secondary-600">Fast</span> and{' '}
              <span className="text-secondary-500 dark:text-secondary-600">Reliable</span> URL Shortener
            </h1>
            <p className="mt-3 text-neutral-800 dark:text-neutral-100 md:text-lg">
              Make your links shorter, smarter, and shareable in a breeze!. Customize, track, and optimize your links
              effortlessly. Boost your brand and engage your audience with shortened links that leave a lasting
              impression.
            </p>

            {/* CTA Buttos */}
            <div className="mt-6 grid w-full gap-4 md:inline-flex">
              <Button>Get Started Now</Button>
              <Button variant="outline">Sign Up For Free</Button>
            </div>
          </div>

          {/* Right */}
          <div className="ml-4">
            <Image
              className="w-full rounded-md"
              src="assets/hero-picture.svg"
              alt="Image Description"
              priority
              title="Hero Picture"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
