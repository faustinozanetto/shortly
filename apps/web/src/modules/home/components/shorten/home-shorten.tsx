'use client';
import Button from '@modules/ui/components/button/button';
import { TextInput } from '@modules/ui/components/forms/text-input';
import React, { useState } from 'react';

const HomeShorten: React.FC = () => {
  const [link, setLink] = useState<string>('');

  const handleLinkShorten = async () => {
    const response = await fetch('/api/short-link', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ link }),
    });
    const data = await response.json();
    console.log({ data });
  };

  return (
    <section className="bg-primary-300 dark:bg-primary-900 w-full" id="shorten">
      <div className="relative mx-auto my-8 max-w-[85rem] px-4 sm:px-6 md:my-16 lg:my-20 lg:px-8">
        <div className="relative z-10 grid gap-4 md:grid-cols-2 md:items-center md:gap-8 xl:gap-20">
          {/* Left */}
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-4xl md:text-start md:text-5xl">
            Shorten your Link Now
          </h2>

          {/* Right */}
          <div className="mx-auto w-full">
            <div className="flex items-end gap-1">
              <TextInput
                id="url"
                name="url"
                label="Shorten your Link"
                value={link}
                placeholder="https://www.youtube.com/"
                onValueChanged={(value) => setLink(value)}
                className="h-12"
              />
              <Button onClick={handleLinkShorten}>Shorten</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeShorten;
