import React from 'react';
import NavbarAuthSignUp from './navbar-auth-signup';
import NavbarAuthSignIn from './navbar-auth-signin';

const NavbarAuth: React.FC = () => {
  return (
    <div className="hidden gap-2 md:flex">
      <NavbarAuthSignIn />
      <NavbarAuthSignUp />
    </div>
  );
};

export default NavbarAuth;
