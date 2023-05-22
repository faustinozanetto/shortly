import { getLinkFromAlias } from '@modules/url-shortener/lib/url-shortener-db';
import { notFound } from 'next/navigation';
import React from 'react';
import UserDashboardLinkDetailsStats from './stats/user-link-details-stats';
import UserDashboardLinkDetailsManagement from './management/user-link-details-management';

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
          <h1 className="leading-2 block text-2xl font-bold text-neutral-800 dark:text-white md:text-3xl lg:text-4xl">
            Link Details
          </h1>
          <h2 className="text-lg md:text-xl">Alias: {link.alias}</h2>
        </div>
        <UserDashboardLinkDetailsManagement link={link} />
      </div>
      {/* @ts-expect-error Server Component */}
      <UserDashboardLinkDetailsStats alias={alias} />
    </div>
  );
};

export default UserLinkDetails;
