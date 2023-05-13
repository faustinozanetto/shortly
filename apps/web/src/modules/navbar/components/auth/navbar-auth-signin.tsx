import Button from '@modules/ui/components/button/button';
import Link from 'next/link';
import React from 'react';

const NavbarAuthSignIn: React.FC = () => {
  return (
    <Link href="/auth/signin">
      <Button className="h-10" aria-label="Sign In" variant="outline" role="link">
        Sign In
      </Button>
    </Link>
  );
};

export default NavbarAuthSignIn;
