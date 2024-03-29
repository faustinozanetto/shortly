import Link from 'next/link';
import React from 'react';

export type NavbarLinkProps = {
  href: string;
  label: string;
};

const NavbarLink: React.FC<NavbarLinkProps> = (props) => {
  const { href, label } = props;

  return (
    <Link href={href}>
      <span className="hover:text-primary font-medium">{label}</span>
    </Link>
  );
};

export default NavbarLink;
