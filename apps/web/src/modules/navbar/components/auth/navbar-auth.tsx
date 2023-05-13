import React from 'react';
import NavbarAuthSignUp from './navbar-auth-signup';
import NavbarAuthLogin from './navbar-auth-login';

const NavbarAuth: React.FC = () => {
  return (
    <div className="hidden gap-2 md:flex">
      <NavbarAuthLogin />
      <NavbarAuthSignUp />
    </div>
  );
};

export default NavbarAuth;
