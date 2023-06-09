'use client';
import React from 'react';
import { Link as PrismaLink } from '@prisma/client';
import Link from 'next/link';
import IconButton from '@modules/ui/components/icon-button/icon-button';
import CopyIcon from '@modules/ui/components/icons/copy-icon';
import LoadingIcon from '@modules/ui/components/icons/loading-icon';
import QRIcon from '@modules/ui/components/icons/qr-icon';
import URLShortenerCopyLink from '@modules/url-shortener/components/copy/url-shortener-copy-link';
import URLShortenerQRCode from '@modules/url-shortener/components/qr-code/url-shortener-qr-code';
import { buttonVariants } from '@modules/ui/components/button/button';
import UserLinkAlias from '@modules/dashboard/components/links/common/user-link-alias';
import UserLinkCreatedAt from '@modules/dashboard/components/links/common/user-link-created-at';
import UserLinkURL from '@modules/dashboard/components/links/common/user-link-url';

type UserDashboardLinkCardProps = {
  link: PrismaLink;
};

const UserDashboardLinkCard = (props: UserDashboardLinkCardProps) => {
  const { link } = props;

  return (
    <li className="bg-background relative flex items-center justify-between rounded-lg border p-4 shadow-lg">
      <div className="flex-1 space-y-1">
        <div className="flex flex-row items-center gap-2">
          {/* Alias */}
          <UserLinkAlias link={link} />
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
        </div>
        {/* Date */}
        <UserLinkCreatedAt link={link} />
        {/* URL */}
        <UserLinkURL link={link} />
      </div>

      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <Link
          className={buttonVariants({ variant: 'ghost', size: 'xs' })}
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
