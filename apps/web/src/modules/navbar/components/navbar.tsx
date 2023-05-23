import React from 'react';
import { NAVBAR_LINKS } from '../lib/navbar.lib';
import NavbarLink from './navbar-link';
import ThemeToggler from '@modules/theming/components/theme-toggler';

import NavbarUserDetails from '@modules/navbar/components/user-details/navbar-user-details';
import Link from 'next/link';
import { getCurrentUser } from '@modules/auth/lib/auth.lib';
import NavbarAuthSignIn from './auth/navbar-auth-signin';
import NavbarLogo from './navbar-logo';
import NavbarMobile from './navbar-mobile';
import NavbarDesktop from './navbar-desktop';

const Navbar = async () => {
  const user = await getCurrentUser();

  return (
    <div className="bg-background-200/70 dark:bg-background-800/70 sticky left-0 right-0 top-0 z-[999] h-20 w-full border-b-2 border-b-neutral-300 p-4 backdrop-blur-lg dark:border-b-neutral-800">
      <div className="container mx-auto flex items-center justify-between">
        {/* Mobile Nav */}
        <NavbarMobile user={user} />
        {/* Logo */}
        <Link href="/" aria-label="Home Page">
          <NavbarLogo />
        </Link>
        {/* Desktop Nav */}
        <NavbarDesktop user={user} />

        {/* Auth */}
        <div className="md:ml-4">{user ? <NavbarUserDetails user={user} /> : <NavbarAuthSignIn />}</div>
      </div>
    </div>
  );
};

export default Navbar;
