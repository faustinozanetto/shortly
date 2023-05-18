import React from 'react';
import { NAVBAR_LINKS } from '../lib/navbar.lib';
import NavbarLink from './navbar-link';
import ThemeToggler from '@modules/theming/components/theme-toggler';

import NavbarUserDetails from '@modules/navbar/components/user-details/navbar-user-details';
import Link from 'next/link';
import { authOptions } from '@modules/auth/lib/auth.lib';
import { getServerSession } from 'next-auth';
import NavbarAuthSignIn from './auth/navbar-auth-signin';
import NavbarLogo from './navbar-logo';

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="bg-background-200/70 dark:bg-background-800/70 sticky left-0 right-0 top-0 z-20 h-20 w-full border-b-2 border-b-neutral-300 p-4 backdrop-blur-lg dark:border-b-neutral-800">
      <div className="container mx-auto flex items-center justify-center md:justify-between">
        <Link href="/" aria-label="Home Page">
          <NavbarLogo />
        </Link>
        <nav className="ml-auto mr-4 hidden space-x-4 md:flex">
          {NAVBAR_LINKS.map((link) => {
            return <NavbarLink key={link.label} {...link} />;
          })}
        </nav>

        <div className="mr-4 hidden md:block">
          {session ? <NavbarUserDetails user={session.user} /> : <NavbarAuthSignIn />}
        </div>

        <div className="hidden md:block">
          <ThemeToggler />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
