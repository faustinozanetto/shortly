import React, { useMemo } from 'react';
import { DISABLE_LINK_TRACKING } from '@modules/analytics/lib/analytics.constants';
import { useUserDashboardLinkStore } from '@modules/dashboard/state/user-dashboard-link.slice';
import { useQuery } from '@tanstack/react-query';
import { LinkGroupedClicksResponse } from '@modules/analytics/types/analytics.types';
import BarChart from '@modules/charts/components/bar-chart';
import { Skeleton } from '@modules/ui/components/skeleton/skeleton';

const LinkStatsClicksChart: React.FC = () => {
  const { link, setStatsCategory } = useUserDashboardLinkStore();

  const { data, isLoading } = useQuery<LinkGroupedClicksResponse>([`clicks-grouped-${link?.alias}`], {
    enabled: !!link,
    queryFn: async () => {
      if (!link || DISABLE_LINK_TRACKING) return [];

      const url = new URL(`/api/links/${encodeURIComponent(link.alias)}/clicks-grouped`, process.env.NEXT_PUBLIC_URL);

      const response = await fetch(url, {
        method: 'GET',
      });
      const { data }: { data: LinkGroupedClicksResponse } = await response.json();

      return data;
    },
    onSuccess(data) {
      console.log({ data });
    },
  });

  const labels = useMemo(() => {
    if (!data) return [];

    return data?.map((entry) => entry.date);
  }, [data]);

  const clicksData = useMemo(() => {
    if (!data) return [];

    return data?.map((entry) => entry.count);
  }, [data]);

  return (
    <div className="flex flex-col rounded border p-4 shadow">
      <h2 className="text-lg font-semibold">Clicks</h2>
      <p>Visualize the clicks of your shortened url grouped by dates.</p>

      {data && data.length > 0 ? (
        <BarChart
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
