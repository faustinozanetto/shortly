'use client';
import Button from '@modules/ui/components/button/button';

import { BuiltInProviderType } from 'next-auth/providers';
import { signIn } from 'next-auth/react';
import React from 'react';

const AuthSignIn: React.FC = () => {
  const handleAuthSignIn = async (provider: BuiltInProviderType) => {
    await signIn(provider);
  };

  return (
    <div className="my-6 w-full rounded-lg bg-neutral-100 p-4 px-4 shadow-lg dark:bg-neutral-800 sm:px-6 md:my-14 md:max-w-lg md:p-6 lg:my-20 lg:max-w-xl">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-center text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-4xl md:text-5xl">
          Sign In
        </h1>
        <p className="max-w-lg text-center text-neutral-800 dark:text-neutral-100 md:text-lg">
          Join us now to access a range of powerful features. Create and manage shortened URLs effortlessly, track link
          performance. Sign In today and unleash the full potential of our platform for your online success.
        </p>
        {/* Auth Options */}
        <div className="flex w-full flex-col">
          <Button
            aria-label="Sign In With Github"
            onClick={async () => await handleAuthSignIn('github')}
            icon={
              <svg
                className="h-6 w-6 stroke-neutral-900 dark:stroke-neutral-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
              </svg>
            }
          >
            Sign In With Github
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthSignIn;
