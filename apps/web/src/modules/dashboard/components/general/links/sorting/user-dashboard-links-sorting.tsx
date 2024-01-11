import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@modules/ui/components/select/select';
import { Label } from '@modules/ui/components/forms/label';
import {
  UserDashboardLinksSortBy,
  useUserDashboardLinksStore,
} from '@modules/dashboard/state/user-dashboard-links.slice';

type UserDashboardLinksSortingProps = {};

const UserDashboardLinksSorting = (props: UserDashboardLinksSortingProps) => {
  const {} = props;

  const { setSortBy } = useUserDashboardLinksStore();

  const handleSortChange = (value: string) => {
    const sortBy = value as UserDashboardLinksSortBy;
    setSortBy(sortBy);
  };

  return (
    <div className="rounded border p-4 shadow">
      <h3 className="leading-2 block text-xl font-bold md:text-2xl">Sort Links</h3>

      <div className="space-y-1">
        <Select name="links-sort" onValueChange={handleSortChange} defaultValue="none">
          <Label>Sort By</Label>
          <SelectTrigger>
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 stroke-current opacity-70"
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
