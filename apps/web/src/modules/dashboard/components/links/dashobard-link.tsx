'use client';
import React, { useEffect } from 'react';
import { Link } from '@prisma/client';
import LinkDetails from './details/link-details';
import LinkStats from './stats/link-stats';
import { useQuery } from '@tanstack/react-query';
import { useUserDashboardLinkStore } from '@modules/dashboard/state/user-dashboard-link.slice';

type DashboardLinkProps = {
  alias: string;
};

const DashboardLink = (props: DashboardLinkProps) => {
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
      <LinkDetails />
      <LinkStats />
    </div>
  );
};

export default DashboardLink;
