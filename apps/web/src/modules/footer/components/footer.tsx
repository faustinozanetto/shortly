import React from 'react';
import FooterCategory from './footer-category';
import { FOOTER_CATEGORIES } from '../lib/footer.lib';
import MarketingLogo from '@modules/common/components/marketing/marketing-logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary/70 flex px-4 md:px-6">
      <div className="container mx-auto max-w-5xl py-4 md:py-6 lg:py-10">
        {/* Categories */}
        <div className="mb-4 grid grid-cols-2 gap-6 sm:grid-cols-3 md:mb-8 lg:grid-cols-4">
          {/* Logo Column */}
          <div className="col-span-full lg:col-span-1">
            <MarketingLogo className="fill-foreground" />
          </div>
          {FOOTER_CATEGORIES.map((category) => {
            return <FooterCategory key={category.title} {...category} />;
          })}
        </div>

        <span>© 2023 Faustino Zanetto. All rights reserved</span>
      </div>
    </footer>
  );
};

export default Footer;
