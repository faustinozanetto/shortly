'use client';
import React, { useState } from 'react';
import { NAVBAR_LINKS } from '../lib/navbar.lib';
import NavbarLink from './navbar-link';
import ThemeToggler from '@modules/theming/components/theme-toggler';

import { User } from 'next-auth';
import IconButton from '@modules/ui/components/icon-button/icon-button';
import { cn } from '@modules/ui/lib/ui.lib';

type NavbarMobileProps = {
  user: User;
};

const NavbarMobile: React.FC<NavbarMobileProps> = (props) => {
  const { user } = props;

  const [showMobileNav, setShowMobileNav] = useState<boolean>(false);

  return (
    <>
      <IconButton
        aria-label="Mobile Nav"
        onClick={() => setShowMobileNav((prev) => !prev)}
        className="md:hidden"
        icon={
          <svg
            className="h-5 w-5 rounded-lg fill-neutral-900 dark:fill-neutral-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <g>
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" />
            </g>
          </svg>
        }
      />
      {showMobileNav ? (
        <div
          className={cn(
            'animate-in slide-in-from-bottom-80 fixed inset-0 top-20 z-50 h-[calc(100vh-5rem)] shadow-lg md:hidden'
          )}
        >
          <div className="bg-background-100 dark:bg-background-900 relative z-20 grid gap-4 rounded-b-lg p-4 text-neutral-900 shadow-md dark:text-neutral-50">
            <nav className="grid gap-4">
              {NAVBAR_LINKS.map((link) => {
                return <NavbarLink key={link.label} {...link} />;
              })}
              {user ? <NavbarLink href="/dashboard" label="Dashboard" /> : null}
            </nav>
            <ThemeToggler>Toggle Theme</ThemeToggler>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default NavbarMobile;
