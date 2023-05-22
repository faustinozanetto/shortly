import { getUserLinks } from '@modules/dashboard/lib/dashboard.lib';
import { Session } from 'next-auth';
import React from 'react';
import UserDashboardLinksTable from './table/user-dashboard-links-table';

type UserDashboardLinksProps = {
  user: Session['user'];
};

const UserDashboardLinks = async (props: UserDashboardLinksProps) => {
  const { user } = props;

  const links = await getUserLinks({ userEmail: user?.email! });

  return (
    <div className="bg-background-100 dark:bg-background-800 rounded-lg p-4 shadow-lg md:p-6">
      <h2 className="leading-2 block text-2xl font-bold text-neutral-800 dark:text-white md:text-3xl lg:text-4xl">
        Generated URLs
      </h2>
      <p className="mt-2 text-neutral-800 dark:text-neutral-100 md:text-lg">
        Manage and optimize your shortened URLs with our user-friendly platform. Edit, update, or delete links as needed
        and organize your URLs with ease.
      </p>

      <div className="mt-2 md:mt-4">
        <UserDashboardLinksTable links={links} />
      </div>
    </div>
  );
};

export default UserDashboardLinks;