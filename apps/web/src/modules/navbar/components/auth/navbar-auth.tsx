import React from 'react';
import NavbarAuthSignUp from './navbar-auth-signup';
import NavbarAuthSignIn from './navbar-auth-signin';
import { useSession } from 'next-auth/react';

const NavbarAuth: React.FC = () => {
  const { status } = useSession();

  if (status === 'unauthenticated') return null;

  return (
    <div className="hidden gap-2 md:flex">
      <NavbarAuthSignIn />
      <NavbarAuthSignUp />
    </div>
  );
};

export default NavbarAuth;
