import React, { useMemo } from 'react';
import { DISABLE_LINK_TRACKING } from '@modules/analytics/lib/analytics.constants';
import { useUserDashboardLinkStore } from '@modules/dashboard/state/user-dashboard-link.slice';
import { useQuery } from '@tanstack/react-query';
import { LinkGroupedClicksResponse } from '@modules/analytics/types/analytics.types';
import { Skeleton } from '@modules/ui/components/skeleton/skeleton';
import { useToast } from '@modules/toasts/hooks/use-toast';
import LineChart from '@modules/charts/components/line-chart';

const LinkStatsClicksChart: React.FC = () => {
  const { toast } = useToast();
  const { link } = useUserDashboardLinkStore();

  const { data, isLoading } = useQuery<LinkGroupedClicksResponse>([`clicks-grouped-${link?.alias}`], {
    enabled: !!link,
    queryFn: async () => {
      if (!link || DISABLE_LINK_TRACKING) return [];

      const url = new URL(`/api/links/${encodeURIComponent(link.alias)}/clicks-grouped`, process.env.NEXT_PUBLIC_URL);

      const response = await fetch(url, {
        method: 'GET',
      });

      if (!response.ok) {
        toast({ variant: 'error', content: 'Failed to fetch clicks!' });
        return [];
      }

      const { data }: { data: LinkGroupedClicksResponse } = await response.json();

      return data;
    },
  });

  const labels = useMemo(() => {
    if (!data) return [];

    return data.map((entry) => entry.date);
  }, [data]);

  const clicksData = useMemo(() => {
    if (!data) return [];

    return data.map((entry) => entry.count);
  }, [data]);

  const totalClicks = useMemo(() => {
    if (!data) return 0;

    return data.reduce((prev, curr) => {
      return prev + curr.count;
    }, 0);
  }, [data]);

  return (
    <div className="flex flex-col rounded border p-4 shadow">
      <div className="flex justify-between">
        {isLoading ? <Skeleton className="h-5 w-40 mb-1" /> : <h2 className="text-lg font-semibold">Clicks</h2>}
        {isLoading ? (
          <Skeleton className="h-5 w-40 mb-1" />
        ) : (
          <p className="text-sm font-medium">Total {totalClicks}</p>
        )}
      </div>

      {data && data.length > 0 ? (
        <LineChart
          title="Clicks"
          tooltipFormat={(value) => `${value} clicks`}
          animate
          data={clicksData}
          labels={labels}
        />
      ) : null}

      {isLoading ? <Skeleton className="h-full w-full" /> : null}

      {!isLoading && data && data.length === 0 ? (
        <p className="text-sm">Not enough data to display information!</p>
      ) : null}
    </div>
  );
};

export default LinkStatsClicksChart;
