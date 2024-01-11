'use client';
import React from 'react';
import { Link } from '@prisma/client';
import UserLinkDetails from './details/user-link-details';
import UserLinkStats from './stats/user-link-stats';
import { useQuery } from '@tanstack/react-query';
import { useUserDashboardLinkStore } from '@modules/dashboard/state/user-dashboard-link.slice';

type UserLinkDetailsProps = {
  alias: string;
};

const UserDashboardLink = (props: UserLinkDetailsProps) => {
  const { alias } = props;

  const { setLink, setIsLoading } = useUserDashboardLinkStore();

  useQuery<Link>([alias], {
    queryFn: async () => {
      const url = new URL(`/api/links/${encodeURIComponent(alias)}`, process.env.NEXT_PUBLIC_URL);
      const response = await fetch(url, {
        method: 'GET',
      });
      const { link }: { link: Link } = await response.json();
      return link;
    },
    onError(err) {
      setIsLoading(false);
    },
    onSuccess(data) {
      setLink(data);
      setIsLoading(false);
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <UserLinkDetails />
      <UserLinkStats />
    </div>
  );
};

export default UserDashboardLink;
