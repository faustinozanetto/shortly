import React from 'react';

import UserLinkManagement from '../management/user-link-management';
import URLShortenerQRCode from '@modules/url-shortener/components/qr-code/url-shortener-qr-code';

import { Badge } from '@modules/ui/components/badge/badge';

import QRIcon from '@modules/ui/components/icons/qr-icon';
import URLShortenerCopyLink from '@modules/url-shortener/components/copy/url-shortener-copy-link';
import CopyIcon from '@modules/ui/components/icons/copy-icon';
import LoadingIcon from '@modules/ui/components/icons/loading-icon';
import UserLinkAlias from '../common/user-link-alias';
import UserLinkURL from '../common/user-link-url';
import UserLinkCreatedAt from '../common/user-link-created-at';
import { Button } from '@modules/ui/components/button/button';
import { Skeleton } from '@modules/ui/components/skeleton/skeleton';
import { useUserDashboardLinkStore } from '@modules/dashboard/state/user-dashboard-link.slice';

const UserLinkDetails: React.FC = () => {
  const { link, isLloading } = useUserDashboardLinkStore();

  return (
    <div className="flex flex-col gap-4 rounded border p-4 shadow md:flex-row md:justify-between">
      <div className="flex flex-col items-start justify-center">
        <div className="w-full gap-1">
          <div className="flex flex-row items-center justify-between gap-2 md:justify-start">
            {isLloading ? <Skeleton className="mb-1 h-5 w-44" /> : <UserLinkAlias link={link} loading={isLloading} />}
            {isLloading ? (
              <Skeleton className="mb-1 h-5 w-5" />
            ) : (
              <URLShortenerQRCode
                link={link}
                renderButton={(onClick) => (
                  <Button size="icon" className="h-8 w-8" aria-label="Create QR Code" onClick={onClick}>
                    <QRIcon className="stroke-current" />
                  </Button>
                )}
              />
            )}
            {isLloading ? (
              <Skeleton className="mb-1 h-5 w-5" />
            ) : (
              <URLShortenerCopyLink
                link={link}
                renderButton={(onClick, isCopyingLoading) => (
                  <Button size="icon" className="h-8 w-8" aria-label="Create QR Code" onClick={onClick}>
                    {isCopyingLoading ? (
                      <LoadingIcon className="stroke-current" />
                    ) : (
                      <CopyIcon className="stroke-current" />
                    )}
                  </Button>
                )}
              />
            )}
          </div>
          {isLloading ? <Skeleton className="mb-1 h-5 w-20" /> : <UserLinkCreatedAt link={link} loading={isLloading} />}
          {isLloading ? <Skeleton className="h-5 w-60" /> : <UserLinkURL link={link} loading={isLloading} />}
        </div>
        {link && link.password ? <Badge className="mt-2">Password protected</Badge> : null}
      </div>
      {isLloading ? <Skeleton className="w-36" /> : <UserLinkManagement />}
    </div>
  );
};

export default UserLinkDetails;
