import NavbarLogo from '@modules/navbar/components/navbar-logo';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-400 dark:bg-primary-800 flex p-4 md:p-6 lg:p-8">
      <div className="container mx-auto max-w-5xl py-4 md:py-6 lg:py-10">
        <div className="flex w-full flex-col space-y-4">
          {/* Categories */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {/* Logo Column */}
            <div className="col-span-2 md:col-span-1">
              <NavbarLogo className="text-neutral-900 dark:text-neutral-50" />
            </div>
            {/* {CATEGORIES.map((category) => {
              return <FooterCategory key={category.category} {...category} />;
            })} */}
          </div>

          <span className="font-medium text-neutral-900  dark:text-neutral-50">
            © 2023 Faustino Zanetto. All rights reserved
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
