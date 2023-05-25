'use client';
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@modules/ui/components/tooltip/tooltip';
import { Skeleton } from '@modules/ui/components/skeleton/skeleton';
import Link from 'next/link';
import { Link as PrismaLink } from '@prisma/client';

type UserLinkURLProps = {
  link: PrismaLink | null;
  loading?: boolean;
};

const UserLinkURL: React.FC<UserLinkURLProps> = (props) => {
  const { link, loading = false } = props;

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0.25}>
        <TooltipTrigger asChild>
          <div className="hover:cursor-pointer">
            <Skeleton loading={loading || !link}>
              <Link
                href={(link && link.url) ?? '/'}
                className="block max-w-[170px] truncate text-sm font-medium text-neutral-700 dark:text-neutral-200 sm:max-w-[300px] md:max-w-[400px] lg:max-w-[550px] xl:max-w-full"
                target="_blank"
              >
                {link?.url ?? 'Default URL'}
              </Link>
            </Skeleton>
          </div>
        </TooltipTrigger>
        <TooltipContent className="font-semibold">
          <p>Link URL</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default UserLinkURL;
