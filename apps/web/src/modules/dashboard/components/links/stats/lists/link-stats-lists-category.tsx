'use client';
import { AnalyticsCategoryType, LinkStatsResponse } from '@modules/analytics/types/analytics.types';

import { Skeleton } from '@modules/ui/components/skeleton/skeleton';
import React, { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';
import LinkStatsListsEntryPlaceholder from './link-stats-lists-entry-placeholder';
import { useUserDashboardLinkStore } from '@modules/dashboard/state/user-dashboard-link.slice';
import { DISABLE_LINK_TRACKING } from '@modules/analytics/lib/analytics.constants';

export type LinkStatsListsCategoryProps = {
  category: string;
  categoryType: AnalyticsCategoryType;
  renderContent: (data: LinkStatsResponse<unknown>, totalCount: number) => React.ReactElement;
};

const LinkStatsListsCategory: React.FC<LinkStatsListsCategoryProps> = (props) => {
  const { category, categoryType, renderContent } = props;

  const { link, setStatsCategory } = useUserDashboardLinkStore();

  const { data, isLoading } = useQuery<LinkStatsResponse<unknown>>([`${category}-${link?.alias}`], {
    enabled: !!link,
    queryFn: async () => {
      if (!link || DISABLE_LINK_TRACKING) return [];

      const url = new URL(`/api/links/${encodeURIComponent(link.alias)}/stats`, process.env.NEXT_PUBLIC_URL);
      url.searchParams.append('stat', categoryType);

      const response = await fetch(url, {
        method: 'GET',
      });
      const { data }: { data: LinkStatsResponse<unknown> } = await response.json();

      const statsData = [...data].sort((a, b) => b.count - a.count);
      return statsData;
    },
    onSuccess(data) {
      setStatsCategory(categoryType, data);
    },
  });

  const totalCount = useMemo(() => {
    if (!data) return 0;

    return data.reduce((prev, curr) => {
      return prev + curr.count;
    }, 0);
  }, [data]);

  return (
    <div className="flex flex-col gap-2 rounded border p-4 shadow">
      {isLoading ? <Skeleton className="h-5 w-40" /> : <h2 className="text-xl font-semibold">{category}</h2>}
      <div className="grid auto-rows-min gap-1">
        {data && data.length > 0 ? renderContent(data, totalCount) : null}
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => {
              return <LinkStatsListsEntryPlaceholder key={`entry-placeholder-${index}`} />;
            })
          : null}
      </div>
      {!isLoading && data && data.length === 0 ? (
        <p className="text-sm">Not enough data to display information!</p>
      ) : null}
    </div>
  );
};

export default LinkStatsListsCategory;
