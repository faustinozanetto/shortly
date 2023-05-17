import AuthSignIn from '@modules/auth/components/sign-in/auth-sign-in';
import Button, { buttonVariants } from '@modules/ui/components/button/button';
import { cn } from '@modules/ui/lib/ui.lib';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your Shortly account to unleash the full potential.',
};

export default function AuthSignInPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link href="/" className={cn(buttonVariants({ variant: 'ghost' }), 'absolute left-4 top-4')}>
        <svg
          className="mr-2 h-5 w-5 stroke-neutral-900 dark:stroke-neutral-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <line x1="5" y1="12" x2="19" y2="12" />
          <line x1="5" y1="12" x2="11" y2="18" />
          <line x1="5" y1="12" x2="11" y2="6" />
        </svg>
        Go Back
      </Link>
      <AuthSignIn />
    </div>
  );
}
