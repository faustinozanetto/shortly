import React from 'react';
import UserDashboardLinksFilteringAlias from './user-dashboard-links-filtering-alias';

import { useUserDashboardLinksStore } from '@modules/dashboard/state/user-dashboard-links.slice';

type UserDashboardLinksFilteringProps = {};

const UserDashboardLinksFiltering = (props: UserDashboardLinksFilteringProps) => {
  const {} = props;

  const { setFilterBy } = useUserDashboardLinksStore();

  const handleAliasFilterChange = (value: string) => {
    setFilterBy({ type: 'alias', value });
  };

  return (
    <div className="bg-background rounded border p-4 shadow">
      <h3 className="leading-2 block text-xl font-bold md:text-2xl">Filter Links</h3>

      <UserDashboardLinksFilteringAlias onChange={handleAliasFilterChange} />
    </div>
  );
};

export default UserDashboardLinksFiltering;
