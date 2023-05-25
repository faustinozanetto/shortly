'use client';
import React from 'react';
import UserDashboardLinkCard from './user-dashboard-link-card';
import { useUserDashboardLinksContext } from '@modules/dashboard/hooks/use-user-dashboard-links-context';
import UserDashboardLinkCardPlaceholder from './user-dashboard-link-card-placeholder';

const UserDashboardLinksList = () => {
  const { state } = useUserDashboardLinksContext();

  return (
    <ul className="flex flex-1 flex-col gap-2 md:gap-4">
      {state.links.length > 0
        ? state.filteredLinks.map((link, index) => {
            return <UserDashboardLinkCard key={link.alias} link={link} />;
          })
        : Array.from({ length: 6 }).map((_, index) => {
            return <UserDashboardLinkCardPlaceholder key={index} />;
          })}
    </ul>
  );
};

export default UserDashboardLinksList;
