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
    <section className="w-full" id="stats">
      <div className="mx-auto w-full max-w-screen-xl px-4 py-10 md:px-20 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="leading-2 block text-3xl font-bold sm:text-4xl lg:text-5xl">
            Sign up for our <span className="text-primary">newsletter</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl md:text-lg">
            Get exclusive updates, industry insights, and valuable tips on link management, branding, and digital
            marketing. Join our newsletter for the latest trends, best practices, and optimization strategies.
          </p>
        </div>

        <NewsletterForm onSubmitted={handleNewsletterSubmit} />
      </div>
    </section>
  );
};

export default HomeNewsletter;
