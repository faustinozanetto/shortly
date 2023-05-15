'use client';
import Button from '@modules/ui/components/button/button';
import React from 'react';
import Link from 'next/link';

const NavbarAuthSignIn: React.FC = () => {
  return (
    <Link href="/auth/signin">
      <Button className="h-10" aria-label="Sign In" role="link">
        Sign In
      </Button>
    </Link>
  );
};

export default NavbarAuthSignIn;
