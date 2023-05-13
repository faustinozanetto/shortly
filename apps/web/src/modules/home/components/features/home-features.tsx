import React from 'react';

const HomeFeatures: React.FC = () => {
  return (
    <section className="bg-primary-400 w-full px-4 md:px-0">
      <div className="mx-auto max-w-5xl py-8 text-center lg:py-16">
        <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
          Explore some features of Gardentify
        </h2>
        <p className="mt-4 max-w-2xl text-xl text-neutral-700">
          Gardentify has multiple features for you to explore and use at any time in your garden dashboard.
        </p>
      </div>
    </section>
  );
};

export default HomeFeatures;
