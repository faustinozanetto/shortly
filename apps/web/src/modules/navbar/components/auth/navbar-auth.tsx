import React from 'react';
import NavbarAuthSignIn from './navbar-auth-signin';
import NavbarAuthSignOut from '@modules/navbar/components/auth/navbar-auth-signout';
import { getCurrentUser } from '@modules/auth/lib/auth.lib';

const NavbarAuth = async () => {
  const user = await getCurrentUser();

  return <div className="hidden gap-2 md:flex">{user ? <NavbarAuthSignOut /> : <NavbarAuthSignIn />}</div>;
};

export default NavbarAuth;
