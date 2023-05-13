import React from 'react';
import NavbarLogo from './navbar-logo';
import { NAVBAR_LINKS } from '../lib/navbar.lib';
import NavbarLink from './navbar-link';

const Navbar: React.FC = () => {
  return (
    <div className=" sticky left-0 right-0 top-0 h-20 w-full border-b-2 border-b-neutral-200 bg-neutral-100/50 p-4 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-center md:justify-between">
        {/* Logo */}
        <NavbarLogo />
        {/* Links */}
        <nav className="hidden gap-4 md:flex">
          {NAVBAR_LINKS.map((link) => {
            return <NavbarLink key={link.label} {...link} />;
          })}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;