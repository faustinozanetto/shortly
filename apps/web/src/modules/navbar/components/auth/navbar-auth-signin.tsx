'use client';

import React from 'react';
import { buttonVariants } from '@modules/ui/components/button/button';
import Link from 'next/link';
import { cn } from '@modules/ui/lib/ui.lib';

const NavbarAuthSignIn: React.FC = () => {
  return (
    <Link href="/auth/signin" className={cn(buttonVariants({}))}>
      Sign In
    </Link>
  );
};

export default NavbarAuthSignIn;
