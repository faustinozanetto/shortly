'use client';
import React, { useState } from 'react';
import { NAVBAR_LINKS } from '../lib/navbar.lib';
import NavbarLink from './navbar-link';
import ThemeToggler from '@modules/theming/components/theme-toggler';

import { User } from 'next-auth';
import { Button } from '@modules/ui/components/button/button';
import { cn } from '@modules/ui/lib/ui.lib';
import { DropdownMenuSeparator } from '@modules/ui/components/dropdown-menu/dropdown-menu';

type NavbarMobileProps = {
  user: User | null;
};

const NavbarMobile: React.FC<NavbarMobileProps> = (props) => {
  const { user } = props;

  const [showMobileNav, setShowMobileNav] = useState<boolean>(false);

  return (
    <>
      <Button
        aria-label="Mobile Nav"
        onClick={() => setShowMobileNav((prev) => !prev)}
        className="md:hidden"
        size="icon"
      >
        <svg
          className="h-5 w-5 fill-current"
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
      </Button>
      {showMobileNav ? (
        <div
          className={cn(
            'animate-in slide-in-from-bottom-80 fixed inset-0 top-20 z-50 h-[calc(100vh-5rem)] shadow md:hidden'
          )}
        >
          <div className="bg-background relative z-20 grid gap-4 rounded-b-lg p-4 shadow">
            <nav className="grid gap-4">
              {NAVBAR_LINKS.map((link) => {
                return <NavbarLink key={link.label} {...link} />;
              })}
              {user ? <NavbarLink href="/dashboard" label="Dashboard" /> : null}
            </nav>
            <DropdownMenuSeparator />
            <ThemeToggler>Toggle Theme</ThemeToggler>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default NavbarMobile;
