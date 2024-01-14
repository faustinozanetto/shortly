'use client';
import React from 'react';
import { Link } from '@prisma/client';
import LinkDetails from './details/link-details';
import LinkStats from './stats/link-stats';
import { useQuery } from '@tanstack/react-query';
import { useUserDashboardLinkStore } from '@modules/dashboard/state/user-dashboard-link.slice';
import { useToast } from '@modules/toasts/hooks/use-toast';
import { useRouter } from 'next/navigation';

type DashboardLinkProps = {
  alias: string;
};

const DashboardLink = (props: DashboardLinkProps) => {
  const { alias } = props;

  const router = useRouter();
  const { toast } = useToast();
  const { setLink, setIsLoading } = useUserDashboardLinkStore();

  useQuery<Link>([alias], {
    queryFn: async () => {
      const url = new URL(`/api/links/${encodeURIComponent(alias)}`, process.env.NEXT_PUBLIC_URL);
      const response = await fetch(url, {
        method: 'GET',
      });
      if (!response.ok) {
        toast({ variant: 'error', content: 'Failed to fetch link!' });
        router.push('/dashboard');
      }

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
