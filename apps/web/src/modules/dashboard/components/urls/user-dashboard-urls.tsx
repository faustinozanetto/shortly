import { getUserLinks } from '@modules/dashboard/lib/dashboard.lib';
import { Session } from 'next-auth';
import React from 'react';
import UserDashboardURLsTable from './user-dashboard-urls-table';

type UserDashboardURLsProps = {
  session: Session;
};

const UserDashboardURLs = async (props: UserDashboardURLsProps) => {
  const { session } = props;

  const links = await getUserLinks({ userId: session.user.id });

  return (
    <div className="rounded-lg bg-neutral-100 p-4 shadow-lg dark:bg-neutral-800 md:p-6">
      <h2 className="leading-2 block text-2xl font-bold text-neutral-800 dark:text-white md:text-3xl lg:text-4xl">
        Generated URLs
      </h2>
      <p className="mt-2 text-neutral-800 dark:text-neutral-100 md:text-lg">
        Manage and optimize your shortened URLs with our user-friendly platform. Edit, update, or delete links as needed
        and organize your URLs with ease.
      </p>

      <UserDashboardURLsTable links={links} />
    </div>
  );
};

export default UserDashboardURLs;
