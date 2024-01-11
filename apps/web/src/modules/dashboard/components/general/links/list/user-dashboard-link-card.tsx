'use client';
import React from 'react';
import { Link as PrismaLink } from '@prisma/client';
import Link from 'next/link';

import CopyIcon from '@modules/ui/components/icons/copy-icon';
import LoadingIcon from '@modules/ui/components/icons/loading-icon';
import QRIcon from '@modules/ui/components/icons/qr-icon';
import URLShortenerCopyLink from '@modules/url-shortener/components/copy/url-shortener-copy-link';
import URLShortenerQRCode from '@modules/url-shortener/components/qr-code/url-shortener-qr-code';
import { Button, buttonVariants } from '@modules/ui/components/button/button';
import UserLinkAlias from '@modules/dashboard/components/links/common/user-link-alias';
import UserLinkCreatedAt from '@modules/dashboard/components/links/common/user-link-created-at';
import UserLinkURL from '@modules/dashboard/components/links/common/user-link-url';

type UserDashboardLinkCardProps = {
  link: PrismaLink;
};

const UserDashboardLinkCard: React.FC<UserDashboardLinkCardProps> = (props) => {
  const { link } = props;

  return (
    <li className="relative flex items-center justify-between rounded border p-4 shadow">
      <div className="flex-1 gap-1">
        <div className="flex flex-row items-center gap-2">
          <UserLinkAlias link={link} />
          <URLShortenerQRCode
            link={link}
            renderButton={(onClick) => (
              <Button size="icon" className="h-8 w-8" aria-label="Create QR Code" onClick={onClick}>
                <QRIcon className="stroke-current" />
              </Button>
            )}
          />
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
        </div>
        <UserLinkCreatedAt link={link} />
        <UserLinkURL link={link} />
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <Link
          className={buttonVariants({ variant: 'ghost', size: 'sm' })}
          href={`/dashboard/${link.alias}`}
          title="Link Details"
          prefetch={false}
        >
          Details
        </Link>
      </div>
    </li>
  );
};

export default UserDashboardLinkCard;
