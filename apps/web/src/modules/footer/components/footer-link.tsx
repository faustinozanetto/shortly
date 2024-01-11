import Link from 'next/link';
import React from 'react';

export type FooterLinkProps = {
  href: string;
  label: string;
};

const FooterLink: React.FC<FooterLinkProps> = (props) => {
  const { href, label } = props;

  return (
    <li>
      <Link href={href}>
        <span className="font-medium">{label}</span>
      </Link>
    </li>
  );
};

export default FooterLink;
