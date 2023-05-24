'use client';
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@modules/ui/components/tooltip/tooltip';
import { useUserDashboardLinkContext } from '@modules/dashboard/hooks/use-user-dashboard-link-context';
import { Skeleton } from '@modules/ui/components/skeleton/skeleton';
import Link from 'next/link';

const UserLinkDetailsURL = () => {
  const { link, loading } = useUserDashboardLinkContext();

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0.25}>
        <TooltipTrigger asChild>
          <div className="hover:cursor-pointer">
            <Skeleton loading={loading || !link}>
              <Link
                href={link?.url ?? '/'}
                className="block max-w-[240px] truncate text-sm font-medium text-neutral-700 dark:text-neutral-200 sm:max-w-full"
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

export default UserLinkDetailsURL;
