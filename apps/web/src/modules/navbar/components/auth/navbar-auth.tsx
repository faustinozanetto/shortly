'use client';
import React from 'react';
import NavbarAuthSignUp from './navbar-auth-signup';
import NavbarAuthSignIn from './navbar-auth-signin';
import { useSession } from 'next-auth/react';
import NavbarAuthSignOut from '@modules/navbar/components/auth/navbar-auth-signout';

const NavbarAuth: React.FC = () => {
  const { status } = useSession();

  return (
    <div className="hidden gap-2 md:flex">
      {status === 'unauthenticated' ? (
        <>
          <NavbarAuthSignIn />
          <NavbarAuthSignUp />
        </>
      ) : null}
      {status === 'authenticated' ? (
        <>
          <NavbarAuthSignOut />
        </>
      ) : null}
    </div>
  );
};

export default NavbarAuth;
