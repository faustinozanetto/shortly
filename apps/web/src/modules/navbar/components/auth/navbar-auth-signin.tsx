'use client';
import Button from '@modules/ui/components/button/button';
import React from 'react';
import { signIn } from 'next-auth/react';

const NavbarAuthSignIn: React.FC = () => {
  return (
    <Button className="h-10" aria-label="Sign In" variant="outline" role="link" onClick={() => signIn()}>
      Sign In
    </Button>
  );
};

export default NavbarAuthSignIn;
