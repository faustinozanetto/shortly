import clsx from 'clsx';
import React from 'react';

type NavbarLogoProps = {
  className?: string;
};

const NavbarLogo: React.FC<NavbarLogoProps> = (props) => {
  const { className = 'text-primary-600' } = props;
  return <span className={clsx('text-4xl font-extrabold', className)}>Shortly</span>;
};

export default NavbarLogo;
