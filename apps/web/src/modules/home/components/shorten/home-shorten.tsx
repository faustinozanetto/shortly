'use client';
import Button from '@modules/ui/components/button/button';
import { TextInput } from '@modules/ui/components/forms/text-input';
import React from 'react';

const HomeShorten: React.FC = () => {
  return (
    <section className="bg-primary-300 dark:bg-primary-900 w-full" id="shorten">
      <div className="relative mx-auto my-6 max-w-[85rem] overflow-hidden overflow-x-hidden px-4 sm:px-6 md:my-14 lg:my-20 lg:px-8">
        <div className="relative z-10 grid gap-4 md:grid-cols-2 md:items-center md:gap-8 xl:gap-20">
          {/* Left */}
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-4xl md:text-start md:text-5xl">
            Shorten your Link Now
          </h2>

          {/* Right */}
          <div className="mx-auto w-full">
            <form className="w-full">
              <label
                htmlFor="default-search"
                className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <TextInput
                  id="url"
                  name="url"
                  value=""
                  placeholder="https://www.youtube.com/"
                  onValueChanged={() => {}}
                  className="h-12"
                />
                <Button className="absolute bottom-1.5 right-1.5 top-1.5" size="sm">
                  Shorten
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeShorten;
