import Button from '@modules/ui/components/button/button';
import Link from 'next/link';
import React from 'react';

const NavbarAuthLogin: React.FC = () => {
  return (
    <Link href="/auth/login">
      <Button className="h-10" aria-label="Login" variant="outline" role="link">
        Login
      </Button>
    </Link>
  );
};

export default NavbarAuthLogin;
