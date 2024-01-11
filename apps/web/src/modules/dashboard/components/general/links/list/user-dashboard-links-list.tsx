'use client';
import React from 'react';
import UserDashboardLinkCard from './user-dashboard-link-card';

import UserDashboardLinkCardPlaceholder from './user-dashboard-link-card-placeholder';
import { DASHBOARD_LINKS_PAGE_SIZE } from '@modules/dashboard/lib/dashboard.constants';
import { useUserDashboardLinksStore } from '@modules/dashboard/state/user-dashboard-links.slice';

const UserDashboardLinksList: React.FC = () => {
  const { isLoading, getFilteredLinks } = useUserDashboardLinksStore();

  return (
    <ul className="flex flex-1 flex-col gap-2 md:gap-4">
      {!isLoading
        ? getFilteredLinks().map((link) => {
            return <UserDashboardLinkCard key={link.alias} link={link} />;
          })
        : Array.from({ length: DASHBOARD_LINKS_PAGE_SIZE }).map((_, index) => {
            return <UserDashboardLinkCardPlaceholder key={index} />;
          })}
    </ul>
  );
};

export default UserDashboardLinksList;
