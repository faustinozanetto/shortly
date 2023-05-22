import { getLinkFromAlias } from '@modules/url-shortener/lib/url-shortener-db';
import { notFound } from 'next/navigation';
import React from 'react';
import UserDashboardLinkDetailsStats from './stats/user-link-details-stats';
import UserDashboardLinkDetailsManagement from './management/user-link-details-management';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@modules/ui/components/tooltip/tooltip';

type UserLinkDetailsProps = {
  alias: string;
};

const UserLinkDetails = async (props: UserLinkDetailsProps) => {
  const { alias } = props;

  const link = await getLinkFromAlias({ alias });
  if (!link) return notFound();

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-background-100 dark:bg-background-800 flex flex-col gap-4 rounded-lg p-4 shadow-lg md:flex-row md:justify-between md:p-6">
        <div>
          <h1 className="leading-2 block text-3xl font-bold text-neutral-800 dark:text-white md:text-4xl">
            Link Details
          </h1>
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
                  <h2 className="text-lg">@{link.alias}</h2>
                </div>
              </TooltipTrigger>
              <TooltipContent className="font-semibold">
                <p>Link Alias</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {/* Management */}
        <UserDashboardLinkDetailsManagement link={link} />
      </div>
      {/* @ts-expect-error Server Component */}
      <UserDashboardLinkDetailsStats alias={alias} />
    </div>
  );
};

export default UserLinkDetails;
