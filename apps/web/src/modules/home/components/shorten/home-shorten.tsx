import React from 'react';

const HomeShorten: React.FC = () => {
  return (
    <section className="bg-primary-400 w-full" id="shorten">
      <div className="relative mx-auto my-8 max-w-[85rem] px-4 sm:px-6 md:my-14 lg:my-20 lg:px-8">
        <h2 className="mb-4 text-center text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl md:text-start">
          Shorten your Link Now
        </h2>
        <form className="">
          <label htmlFor="default-search" className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Search
          </label>
          <div className="relative">
            <input
              type="search"
              id="default-search"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Search Mockups, Logos..."
              required
            />
            <button
              type="submit"
              className="absolute bottom-2.5 right-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Short Link
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default HomeShorten;
