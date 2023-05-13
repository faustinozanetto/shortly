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
      <span className="text-lg font-semibold text-neutral-50">{label}</span>
    </Link>
  );
};

export default NavbarLink;
