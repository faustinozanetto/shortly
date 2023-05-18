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
      <span className="hover:text-primary-800 dark:hover:text-primary-500 font-medium text-neutral-900 dark:text-neutral-50">
        {label}
      </span>
    </Link>
  );
};

export default NavbarLink;
