'use client';
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@modules/ui/components/tooltip/tooltip';
import { useUserDashboardLinkContext } from '@modules/dashboard/hooks/use-user-dashboard-link-context';
import { Skeleton } from '@modules/ui/components/skeleton/skeleton';

const UserLinkDetailsAlias = () => {
  const { link, loading } = useUserDashboardLinkContext();

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0.25}>
        <TooltipTrigger asChild>
          <div className="mt-2 flex items-center gap-2 hover:cursor-pointer">
            <svg
              className="bg-secondary-400 dark:bg-secondary-600 h-8 w-8 rounded-lg stroke-neutral-900 p-1.5 dark:stroke-neutral-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5 6.5a4.5 4.5 0 0 0 9 9l6.5 -6.5" />
            </svg>
            <Skeleton loading={loading || !link}>
              <h2 className="text-lg">{`@${link?.alias}`}</h2>
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
