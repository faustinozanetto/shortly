'use client';
import Button from '@modules/ui/components/button/button';
import { TextInput } from '@modules/ui/components/forms/text-input';
import Link from 'next/link';
import React from 'react';

const HomeNewsletter: React.FC = () => {
  return (
    <section className="w-full bg-neutral-50 dark:bg-neutral-900" id="features">
      <div className="md:my-22 relative mx-auto my-14 max-w-[85rem] px-4 text-center sm:px-6 lg:my-32 lg:px-8">
        <h2 className="leading-2 block text-3xl font-bold text-neutral-800 dark:text-white sm:text-4xl lg:text-5xl">
          Sign up for our <span className="text-secondary-500 dark:text-secondary-600">newsletter</span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-neutral-800 dark:text-neutral-100 md:text-lg">
          Get exclusive updates, industry insights, and valuable tips on link management, branding, and digital
          marketing. Join our newsletter for the latest trends, best practices, and optimization strategies.
        </p>

        <div className="mx-auto mt-4 flex w-full max-w-screen-sm flex-col gap-2 rounded-lg bg-neutral-100 p-4 shadow-lg dark:bg-neutral-800">
          <div className="flex flex-col gap-2 md:w-auto md:flex-row md:items-end">
            <TextInput
              id="email"
              name="email"
              label="Enter your Email"
              type="email"
              inputMode="email"
              value=""
              placeholder="examplemail@mail.com"
              onValueChanged={() => {}}
              className="h-12"
            />
            <Button>Subscribe</Button>
          </div>
          <p className="text-start text-sm  text-neutral-900 dark:text-neutral-50">
            We care about your privacy, learn more at{' '}
            <Link href="/privacy" className="text-primary-600 dark:text-primary-500 font-medium hover:underline">
              privacy
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeNewsletter;
