import React from 'react';
import { useUserDashboardLinksContext } from '@modules/dashboard/hooks/use-user-dashboard-links-context';
import { UserDashboardLinksSortBy, UserDashboardLinksType } from '@modules/dashboard/context/links/reducer/types';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@modules/ui/components/select/select';
import { Label } from '@modules/ui/components/forms/label';

type UserDashboardLinksSortingProps = {};

const UserDashboardLinksSorting = (props: UserDashboardLinksSortingProps) => {
  const {} = props;

  const { dispatch } = useUserDashboardLinksContext();

  const handleSortChange = (value: string) => {
    const sortBy = value as UserDashboardLinksSortBy;
    dispatch({ type: UserDashboardLinksType.SET_SORT_BY, payload: { sortBy } });
  };

  return (
    <div className="bg-background rounded-lg border p-4 shadow-lg">
      <h3 className="leading-2 block text-xl font-bold text-neutral-800 dark:text-white md:text-2xl">Sort Links</h3>

      <div className="space-y-1">
        <Select name="links-sort" onValueChange={handleSortChange} defaultValue="none">
          <Label>Sort By</Label>
          <SelectTrigger>
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 stroke-neutral-800 opacity-70 dark:stroke-neutral-100"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 9l4 -4l4 4m-4 -4v14" />
                <path d="M21 15l-4 4l-4 -4m4 4v-14" />
              </svg>
              <SelectValue placeholder="Select a filter" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="alias">Alias</SelectItem>
              <SelectItem value="createdAt">Created At</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default UserDashboardLinksSorting;
