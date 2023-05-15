import React from 'react';
import NavbarLogo from './navbar-logo';
import { NAVBAR_LINKS } from '../lib/navbar.lib';
import NavbarLink from './navbar-link';
import ThemeToggler from '@modules/theming/components/theme-toggler';
import NavbarAuth from './auth/navbar-auth';

import NavbarUserDetails from '@modules/navbar/components/user-details/navbar-user-details';
import Link from 'next/link';

const Navbar = async () => {
  return (
    <div className=" sticky left-0 right-0 top-0 z-20 h-20 w-full border-b-2 border-b-neutral-300 bg-neutral-200/70 p-4 backdrop-blur-lg dark:border-b-neutral-800 dark:bg-neutral-800/70">
      <div className="container mx-auto flex items-center justify-center gap-2 md:justify-between">
        <Link href="/">
          <NavbarLogo />
        </Link>
        <nav className="ml-auto mr-4 hidden gap-4 md:flex">
          {NAVBAR_LINKS.map((link) => {
            return <NavbarLink key={link.label} {...link} />;
          })}
        </nav>
        {/* @ts-expect-error Server Component */}
        <NavbarAuth />
        {/* @ts-expect-error Server Component */}
        <NavbarUserDetails />
        <div className="hidden md:block">
          <ThemeToggler />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
