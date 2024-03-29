import React from 'react';

import NavbarUserDetails from '@modules/navbar/components/user-details/navbar-user-details';
import Link from 'next/link';
import { getCurrentUser } from '@modules/auth/lib/auth.lib';
import NavbarAuthSignIn from './auth/navbar-auth-signin';
import NavbarMobile from './navbar-mobile';
import NavbarDesktop from './navbar-desktop';
import MarketingLogo from '@modules/common/components/marketing/marketing-logo';

const Navbar = async () => {
  const user = await getCurrentUser();

  return (
    <div className="bg-background/70 sticky left-0 right-0 top-0 z-[999] h-20 w-full border-b p-4 backdrop-blur-lg">
      <div className="mx-auto flex items-center justify-between sm:container">
        {/* Mobile Nav */}
        <NavbarMobile user={user} />
        {/* Logo */}
        <Link href="/" aria-label="Home Page">
          <MarketingLogo />
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
