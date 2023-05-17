'use client';
import NewsletterForm from '@modules/newsletter/component/newsletter-form';
import { NewsletterFormData } from '@modules/newsletter/types/newsletter.types';

import React from 'react';

const HomeNewsletter: React.FC = () => {
  const handleNewsletterSubmit = async (formData: NewsletterFormData) => {
    try {
      const body = JSON.stringify(formData);

      const response = await fetch('/api/subscribe-newsletter', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      });

      const data: { message: string } = await response.json();
    } catch (error) {}
  };

  return (
    <section className="bg-background-50 dark:bg-background-900 w-full" id="features">
      <div className="md:my-22 relative mx-auto my-14 max-w-[85rem] px-4 text-center sm:px-6 lg:my-32 lg:px-8">
        <h2 className="leading-2 block text-3xl font-bold text-neutral-800 dark:text-white sm:text-4xl lg:text-5xl">
          Sign up for our <span className="text-secondary-500 dark:text-secondary-600">newsletter</span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-neutral-800 dark:text-neutral-100 md:text-lg">
          Get exclusive updates, industry insights, and valuable tips on link management, branding, and digital
          marketing. Join our newsletter for the latest trends, best practices, and optimization strategies.
        </p>

        <div className="bg-background-100 dark:bg-background-800 mx-auto mt-4 flex w-full max-w-screen-sm flex-col gap-2 rounded-lg p-4 shadow-lg md:p-6">
          <NewsletterForm onSubmitted={handleNewsletterSubmit} />
        </div>
      </div>
    </section>
  );
};

export default HomeNewsletter;
