import NavbarLogo from '@modules/navbar/components/navbar-logo';
import React from 'react';
import FooterCategory from './footer-category';
import { FOOTER_CATEGORIES } from '../lib/footer.lib';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-400 dark:bg-primary-800 flex px-4 md:px-6">
      <div className="container mx-auto max-w-5xl py-4 md:py-6 lg:py-10">
        {/* Categories */}
        <div className="mb-4 grid grid-cols-2 gap-6 sm:grid-cols-3 md:mb-8 lg:grid-cols-4">
          {/* Logo Column */}
          <div className="col-span-full lg:col-span-1">
            <NavbarLogo />
          </div>
          {FOOTER_CATEGORIES.map((category) => {
            return <FooterCategory key={category.title} {...category} />;
          })}
        </div>

        <span className="font-m text-neutral-900  dark:text-neutral-50">
          © 2023 Faustino Zanetto. All rights reserved
        </span>
      </div>
    </footer>
  );
};

export default Footer;
