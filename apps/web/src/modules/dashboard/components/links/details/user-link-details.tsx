import React from 'react';

import UserLinkManagement from '../management/user-link-management';
import URLShortenerQRCode from '@modules/url-shortener/components/qr-code/url-shortener-qr-code';
import { useUserDashboardLinkContext } from '@modules/dashboard/hooks/use-user-dashboard-link-context';
import { Badge } from '@modules/ui/components/badge/badge';
import IconButton from '@modules/ui/components/icon-button/icon-button';
import QRIcon from '@modules/ui/components/icons/qr-icon';
import URLShortenerCopyLink from '@modules/url-shortener/components/copy/url-shortener-copy-link';
import CopyIcon from '@modules/ui/components/icons/copy-icon';
import LoadingIcon from '@modules/ui/components/icons/loading-icon';
import UserLinkAlias from '../common/user-link-alias';
import UserLinkURL from '../common/user-link-url';
import UserLinkCreatedAt from '../common/user-link-created-at';
import { Skeleton } from '@modules/ui/components/skeleton/skeleton';

const UserLinkDetails = () => {
  const { link, loading } = useUserDashboardLinkContext();

  return (
    <div className="bg-foreground flex flex-col gap-4 rounded-lg border p-4 shadow-lg md:flex-row md:justify-between">
      <div className="flex flex-col items-start justify-center">
        <div className="w-full space-y-1">
          <div className="flex flex-row items-center justify-between gap-2 md:justify-start">
            {/* Alias */}
            <UserLinkAlias link={link} loading={loading} />
            <Skeleton className="flex gap-2" loading={loading || !link}>
              {/* QR Code */}
              <URLShortenerQRCode
                link={link}
                renderButton={(onClick) => (
                  <IconButton size="xs" aria-label="Create QR Code" onClick={onClick} icon={<QRIcon />} />
                )}
              />
              {/* Copy */}
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
          {/* Date */}
          <UserLinkCreatedAt link={link} loading={loading} />
          {/* URL */}
          <UserLinkURL link={link} loading={loading} />
        </div>
        {link && link.password ? <Badge className="mt-2">Password protected</Badge> : null}
      </div>
      <UserLinkManagement />
    </div>
  );
};

export default UserLinkDetails;
