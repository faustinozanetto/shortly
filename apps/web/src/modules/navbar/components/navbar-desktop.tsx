'use client';
import React from 'react';
import { NAVBAR_LINKS } from '../lib/navbar.lib';
import NavbarLink from './navbar-link';
import ThemeToggler from '@modules/theming/components/theme-toggler';

import { User } from 'next-auth';

type NavbarDesktopProps = {
  user: User | null;
};

const NavbarDesktop: React.FC<NavbarDesktopProps> = (props) => {
  const { user } = props;

  return (
    <div className="hidden items-center gap-4 md:ml-auto md:flex">
      <nav className="ml-auto flex gap-4">
        {NAVBAR_LINKS.map((link) => {
          return <NavbarLink key={link.label} {...link} />;
        })}
        {user ? <NavbarLink href="/dashboard" label="Dashboard" /> : null}
      </nav>
      <ThemeToggler />
    </div>
  );
};

export default NavbarDesktop;
