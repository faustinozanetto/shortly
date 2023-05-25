'use client';
import React, { useEffect } from 'react';
import UserDashboardLinksList from './list/user-dashboard-links-list';
import UserDashboardLinksFiltering from './filtering/user-dashboard-links-filtering';
import { Link } from '@prisma/client';
import { useUserDashboardLinksContext } from '@modules/dashboard/hooks/use-user-dashboard-links-context';
import { UserDashboardLinksType } from '@modules/dashboard/context/links/reducer/types';
import UserDashboardLinksSorting from './sorting/user-dashboard-links-sorting';

type UserDashboardLinksProps = {
  links: Link[];
};

const UserDashboardLinks: React.FC<UserDashboardLinksProps> = (props) => {
  const { links } = props;

  const { dispatch } = useUserDashboardLinksContext();

  useEffect(() => {
    dispatch({ type: UserDashboardLinksType.SET_LINKS, payload: { links } });
  }, [links]);

  return (
    <div className="bg-foreground rounded-lg border p-4 shadow-lg md:p-6">
      <h2 className="leading-2 block text-2xl font-bold text-neutral-800 dark:text-white md:text-3xl lg:text-4xl">
        Generated URLs
      </h2>
      <p className="mt-2 text-neutral-800 dark:text-neutral-100 md:text-lg">
        Manage and optimize your shortened URLs with our user-friendly platform. Edit, update, or delete links as needed
        and organize your URLs with ease.
      </p>

      <div className="mt-4 flex flex-col gap-4 md:mt-6 lg:flex-row">
        {/* Desktop Filtering and Sorting */}
        <div className="scrollbar-hide col-span-2 grid max-h-[calc(100vh-350px)] grid-rows-2 gap-4 overflow-auto md:grid-cols-2 md:grid-rows-1 lg:sticky lg:top-24 lg:min-w-[300px] lg:grid-cols-1 lg:grid-rows-2 lg:self-start">
          <UserDashboardLinksFiltering />
          <UserDashboardLinksSorting />
        </div>
        {/* Links List */}
        <UserDashboardLinksList />
      </div>
    </div>
  );
};

export default UserDashboardLinks;
