import Button from '@modules/ui/components/button/button';
import Link from 'next/link';
import React from 'react';

const NavbarAuthSignUp: React.FC = () => {
  return (
    <Link href="/auth/signup">
      <Button className="h-10" aria-label="Sign Up" role="link">
        Sign Up
      </Button>
    </Link>
  );
};

export default NavbarAuthSignUp;
