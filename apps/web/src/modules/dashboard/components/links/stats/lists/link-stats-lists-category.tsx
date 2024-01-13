'use client';
import { AnalyticsCategoryType, LinkStatsResponse } from '@modules/analytics/types/analytics.types';

import { Skeleton } from '@modules/ui/components/skeleton/skeleton';
import React, { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';
import LinkStatsListsEntryPlaceholder from './link-stats-lists-entry-placeholder';
import { useUserDashboardLinkStore } from '@modules/dashboard/state/user-dashboard-link.slice';
import { DISABLE_LINK_TRACKING } from '@modules/analytics/lib/analytics.constants';

export type LinkStatsListsCategoryProps = {
  title: string;
  categoryType: AnalyticsCategoryType;
  onRenderContent: (data: LinkStatsResponse<unknown>, totalCount: number) => React.ReactElement;
};

const LinkStatsListsCategory: React.FC<LinkStatsListsCategoryProps> = (props) => {
  const { title, categoryType, onRenderContent } = props;

  const { link, stats, statsIsLoading, setStatsCategory, setStatsCategoryIsLoading } = useUserDashboardLinkStore();

  useQuery<LinkStatsResponse<unknown>>([`${title}-${link?.alias}`], {
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
      setStatsCategoryIsLoading(categoryType, false);
    },
  });

  const totalCount = useMemo(() => {
    if (!stats[categoryType]) return 0;

    return stats[categoryType].reduce((prev, curr) => {
      return prev + curr.count;
    }, 0);
  }, [stats[categoryType]]);

  return (
    <div className="flex flex-col gap-1 rounded border p-4 shadow">
      {statsIsLoading[categoryType] ? (
        <Skeleton className="h-5 w-40" />
      ) : (
        <h2 className="text-lg font-semibold">{title}</h2>
      )}
      <div className="grid auto-rows-min gap-1">
        {stats[categoryType] && stats[categoryType].length > 0
          ? onRenderContent(stats[categoryType], totalCount)
          : null}
        {statsIsLoading[categoryType]
          ? Array.from({ length: 3 }).map((_, index) => {
              return <LinkStatsListsEntryPlaceholder key={`entry-placeholder-${index}`} />;
            })
          : null}
      </div>
      {!statsIsLoading[categoryType] && stats[categoryType] && stats[categoryType].length === 0 ? (
        <p className="text-sm">Not enough data to display information!</p>
      ) : null}
    </div>
  );
};

export default LinkStatsListsCategory;
