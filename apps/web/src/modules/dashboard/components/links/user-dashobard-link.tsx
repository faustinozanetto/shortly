'use client';
import { useUserDashboardLinkContext } from '@modules/dashboard/hooks/use-user-dashboard-link-context';
import { Link } from '@prisma/client';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import UserLinkDetails from './details/user-link-details';
import UserLinkStats from './stats/user-link-stats';

type UserLinkDetailsProps = {
  alias: string;
};

const UserDashboardLink = (props: UserLinkDetailsProps) => {
  const { alias } = props;

  const { setLink, setLoading } = useUserDashboardLinkContext();

  const { data, error, isLoading } = useQuery<Link>(alias, {
    queryFn: async () => {
      const url = new URL(`/api/links/${encodeURIComponent(alias)}`, process.env.NEXT_PUBLIC_URL);
      const response = await fetch(url, {
        method: 'GET',
      });
      const { link }: { link: Link } = await response.json();
      return link;
    },
  });

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (data) setLink(data);
  }, [data]);

  return (
    <div className="flex flex-col gap-4">
      <UserLinkDetails />
      <UserLinkStats />
    </div>
  );
};

export default UserDashboardLink;
