import React from 'react';
import FooterLink, { FooterLinkProps } from './footer-link';

export type FooterCategoryProps = {
  title: string;
  links: FooterLinkProps[];
};

const FooterCategory: React.FC<FooterCategoryProps> = (props) => {
  const { title, links } = props;

  return (
    <div>
      <span className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">{title}</span>
      <ul className="mt-3 grid space-y-2 text-sm">
        {links.map((link) => {
          return <FooterLink key={link.label} {...link} />;
        })}
      </ul>
    </div>
  );
};
export default FooterCategory;
