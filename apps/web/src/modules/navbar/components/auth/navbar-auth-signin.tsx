'use client';

import React from 'react';
import { buttonVariants } from '@modules/ui/components/button/button';
import Link from 'next/link';
import { cn } from '@modules/ui/lib/ui.lib';
import SignInIcon from '@modules/ui/components/icons/sign-in-icon';

const NavbarAuthSignIn: React.FC = () => {
  return (
    <Link href="/sign-in" className={cn(buttonVariants({ variant: 'outline' }))}>
      <SignInIcon className="mr-2" />
      Sign In
    </Link>
  );
};

export default NavbarAuthSignIn;
