import React from 'react';
import NavbarAuthSignIn from './navbar-auth-signin';
import NavbarAuthSignOut from '@modules/navbar/components/auth/navbar-auth-signout';
import { authOptions } from '@modules/auth/lib/auth.lib';
import { getServerSession } from 'next-auth';

const NavbarAuth = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  return <div className="hidden gap-2 md:flex">{session ? <NavbarAuthSignOut /> : <NavbarAuthSignIn />}</div>;
};

export default NavbarAuth;
