import { Input } from '@modules/ui/components/forms/input';
import React from 'react';
import UserDashboardLinksFilteringAlias from './user-dashboard-links-filtering-alias';
import { useUserDashboardLinksContext } from '@modules/dashboard/hooks/use-user-dashboard-links-context';
import { UserDashboardLinksType } from '@modules/dashboard/context/links/reducer/types';

type UserDashboardLinksFilteringProps = {};

const UserDashboardLinksFiltering = (props: UserDashboardLinksFilteringProps) => {
  const {} = props;

  const { dispatch } = useUserDashboardLinksContext();

  const handleAliasFilterChange = (value: string) => {
    dispatch({ type: UserDashboardLinksType.SET_FILTER_BY, payload: { filterBy: { type: 'alias', value } } });
  };

  return (
    <div className="bg-background rounded-lg border p-4 shadow-lg">
      <h3 className="leading-2 block text-xl font-bold text-neutral-800 dark:text-white md:text-2xl">Filter Links</h3>

      <UserDashboardLinksFilteringAlias onChange={handleAliasFilterChange} />
    </div>
  );
};

export default UserDashboardLinksFiltering;
