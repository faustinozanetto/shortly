import React from 'react';

import UserLinkDetailsAlias from './user-link-details-alias';
import UserLinkManagement from '../management/user-link-management';
import URLShortenerQRCode from '@modules/url-shortener/components/qr-code/url-shortener-qr-code';
import { useUserDashboardLinkContext } from '@modules/dashboard/hooks/use-user-dashboard-link-context';
import { Badge } from '@modules/ui/components/badge/badge';
import UserLinkDetailsURL from './user-link-details-url';
import IconButton from '@modules/ui/components/icon-button/icon-button';
import QRIcon from '@modules/ui/components/icons/qr-icon';
import { Skeleton } from '@modules/ui/components/skeleton/skeleton';
import URLShortenerCopyLink from '@modules/url-shortener/components/copy/url-shortener-copy-link';
import CopyIcon from '@modules/ui/components/icons/copy-icon';
import LoadingIcon from '@modules/ui/components/icons/loading-icon';

const UserLinkDetails = () => {
  const { link, loading } = useUserDashboardLinkContext();

  return (
    <div className="bg-background-100 dark:bg-background-800 flex flex-col gap-4 rounded-lg p-4 shadow-lg md:flex-row md:justify-between md:p-6">
      <div className="flex flex-col items-start">
        <div className="mb-1 flex items-center gap-2">
          <UserLinkDetailsAlias />
          {/* QR Code */}
          <Skeleton loading={loading || !link}>
            <URLShortenerQRCode
              link={link}
              renderButton={(onClick) => (
                <IconButton size="xs" aria-label="Create QR Code" onClick={onClick} icon={<QRIcon />} />
              )}
            />
          </Skeleton>
          {/* Copy */}
          <Skeleton loading={loading || !link}>
            <URLShortenerCopyLink
              link={link}
              renderButton={(onClick, isCopyingLoading) => (
                <IconButton
                  size="xs"
                  aria-label="Create QR Code"
                  onClick={onClick}
                  icon={isCopyingLoading ? <LoadingIcon /> : <CopyIcon />}
                />
              )}
            />
          </Skeleton>
        </div>
        <UserLinkDetailsURL />
        {link && link.password ? <Badge className="mt-2">Password protected</Badge> : null}
      </div>
      <UserLinkManagement />
    </div>
  );
};

export default UserLinkDetails;
