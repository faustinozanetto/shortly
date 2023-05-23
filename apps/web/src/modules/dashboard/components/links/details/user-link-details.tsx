import React from 'react';

import UserLinkDetailsAlias from './user-link-details-alias';
import UserLinkManagement from '../management/user-link-management';
import URLShortenerQRCode from '@modules/url-shortener/components/qr-code/url-shortener-qr-code';
import { useUserDashboardLinkContext } from '@modules/dashboard/hooks/use-user-dashboard-link-context';
import { Badge } from '@modules/ui/components/badge/badge';

const UserLinkDetails = () => {
  const { link } = useUserDashboardLinkContext();

  return (
    <div className="bg-background-100 dark:bg-background-800 flex flex-col gap-4 rounded-lg p-4 shadow-lg md:flex-row md:justify-between md:p-6">
      <div>
        <div className="flex items-center gap-2">
          {link ? <URLShortenerQRCode link={link} /> : null}
          <h1 className="leading-2 text-3xl font-bold text-neutral-800 dark:text-white md:text-4xl">Link Details</h1>
        </div>
        <UserLinkDetailsAlias />
        {link && link.password ? <Badge className="mt-2">Password protected</Badge> : null}
      </div>
      <UserLinkManagement />
    </div>
  );
};

export default UserLinkDetails;
