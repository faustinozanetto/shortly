'use client';
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@modules/ui/components/tooltip/tooltip';
import { useUserDashboardLinkContext } from '@modules/dashboard/hooks/use-user-dashboard-link-context';
import { Skeleton } from '@modules/ui/components/skeleton/skeleton';
import Link from 'next/link';
import { getCompleteShortenedURL } from '@modules/url-shortener/lib/url-shortener.lib';

const UserLinkDetailsAlias = () => {
  const { link, loading } = useUserDashboardLinkContext();

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0.25}>
        <TooltipTrigger asChild>
          <div className="hover:cursor-pointer">
            <Skeleton loading={loading || !link}>
              <Link
                href={getCompleteShortenedURL(link?.alias!)}
                className="text-primary-600 w-24 truncate font-semibold dark:text-purple-400 md:text-lg"
                target="_blank"
              >{`@${link?.alias}`}</Link>
            </Skeleton>
          </div>
        </TooltipTrigger>
        <TooltipContent className="font-semibold">
          <p>Link Alias</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default UserLinkDetailsAlias;
