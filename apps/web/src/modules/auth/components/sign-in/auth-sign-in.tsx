'use client';
import { AuthSignInOption } from '@modules/auth/types/auth.types';
import { useToast } from '@modules/toasts/hooks/use-toast';
import Button from '@modules/ui/components/button/button';

import { BuiltInProviderType } from 'next-auth/providers';
import { signIn } from 'next-auth/react';
import React from 'react';

export const AUTH_SIGN_IN_OPTIONS: AuthSignInOption[] = [
  {
    provider: 'github',
    label: 'GitHub',
    icon: (
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
    ),
  },
  {
    provider: 'discord',
    label: 'Discord',
    icon: (
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
        <circle cx="9" cy="12" r="1" />
        <circle cx="15" cy="12" r="1" />
        <path d="M7.5 7.5c3.5 -1 5.5 -1 9 0" />
        <path d="M7 16.5c3.5 1 6.5 1 10 0" />
        <path d="M15.5 17c0 1 1.5 3 2 3c1.5 0 2.833 -1.667 3.5 -3c.667 -1.667 .5 -5.833 -1.5 -11.5c-1.457 -1.015 -3 -1.34 -4.5 -1.5l-1 2.5" />
        <path d="M8.5 17c0 1 -1.356 3 -1.832 3c-1.429 0 -2.698 -1.667 -3.333 -3c-.635 -1.667 -.476 -5.833 1.428 -11.5c1.388 -1.015 2.782 -1.34 4.237 -1.5l1 2.5" />
      </svg>
    ),
  },
];

const AuthSignIn: React.FC = () => {
  const { toast } = useToast();

  const handleAuthSignIn = async (provider: BuiltInProviderType) => {
    try {
      await signIn(provider, { redirect: false, callbackUrl: '/dashboard' });
    } catch (error) {
      toast({ variant: 'error', content: 'An error occurred while signing in!' });
    }
  };

  return (
    <div className="bg-foreground rounded-lg border p-4 px-4 shadow-lg md:p-6">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-center text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-4xl md:text-5xl">
          Sign In
        </h1>
        <p className="max-w-lg text-center text-neutral-800 dark:text-neutral-100 md:text-lg">
          Join us now to access a range of powerful features. Create and manage shortened URLs effortlessly, track link
          performance. Sign In today and unleash the full potential of our platform for your online success.
        </p>
        {/* Auth Options */}
        <div className="flex w-full flex-col gap-2">
          {AUTH_SIGN_IN_OPTIONS.map((option) => {
            return (
              <Button
                key={option.provider}
                aria-label={`Sign In With ${option.label}`}
                onClick={async () => await handleAuthSignIn(option.provider)}
                icon={option.icon}
                size="xl"
              >
                Sign In With {option.label}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AuthSignIn;
