'use client';
import { AnalyticsDataType, LinkStatsResponse } from '@modules/analytics/types/analytics.types';
import { useUserDashboardLinkContext } from '@modules/dashboard/hooks/use-user-dashboard-link-context';
import { Skeleton } from '@modules/ui/components/skeleton/skeleton';
import React, { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';
import UserLinkStatsEntryPlaceholder from './user-link-stats-entry-placeholder';

type UserLinkStatsCategoryProps = {
  category: string;
  dataType: AnalyticsDataType;
  renderContent: (data: LinkStatsResponse<unknown>, total: number) => React.ReactElement;
};

const UserLinkStatsCategory = (props: UserLinkStatsCategoryProps) => {
  const { category, dataType, renderContent } = props;

  const { link } = useUserDashboardLinkContext();

  const { data, isLoading } = useQuery<LinkStatsResponse<unknown>>([`${category}-${link?.alias}`], {
    enabled: !!link,
    queryFn: async () => {
      // We disable it in development to prevent daily limits in tinybird.
      if (!link || process.env.NODE_ENV === 'development') return [];

      const url = new URL(`/api/links/${encodeURIComponent(link.alias)}/stats`, process.env.NEXT_PUBLIC_URL);
      url.searchParams.append('stat', dataType);
      const response = await fetch(url, {
        method: 'GET',
      });
      const { data }: { data: LinkStatsResponse<unknown> } = await response.json();
      let statsData = data ?? [];
      statsData.sort((a, b) => b.count - a.count);
      return statsData;
    },
  });

  const total = useMemo(() => {
    let totalCount = 0;
    if (data)
      totalCount = data.reduce((prev, curr, index) => {
        return prev + curr.count;
      }, 0);

    return totalCount;
  }, [data]);

  return (
    <div className="bg-foreground flex flex-col gap-2 rounded-lg border p-4 shadow-lg md:p-6">
      <Skeleton loading={isLoading && !link}>
        <h2 className="text-xl font-semibold">{category}</h2>
      </Skeleton>
      <Skeleton className="w-full" loading={isLoading && !link}>
        <div className="grid auto-rows-min gap-2">
          {data && data.length > 0 ? renderContent(data, total) : null}

          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => {
                return <UserLinkStatsEntryPlaceholder key={`entry-placeholder-${index}`} />;
              })
            : null}
        </div>
        {!isLoading && data && data.length === 0 ? <span className="text-center text-sm">Not enough data!</span> : null}
      </Skeleton>
    </div>
  );
};

export default UserLinkStatsCategory;
