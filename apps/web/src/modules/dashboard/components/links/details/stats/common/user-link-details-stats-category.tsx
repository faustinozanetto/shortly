import { AnalyticsDataType, LinkStatsResponse } from '@modules/analytics/types/analytics.types';
import React from 'react';

type UserLinkDetailsStatsCategoryProps = {
  alias: string;
  category: string;
  dataType: AnalyticsDataType;
  renderContent: (data: LinkStatsResponse<unknown>) => React.ReactElement;
};

const UserLinkDetailsStatsCategory = async (props: UserLinkDetailsStatsCategoryProps) => {
  const { alias, category, dataType, renderContent } = props;

  const getStatsData = async () => {
    const url = new URL(`/api/links/${encodeURIComponent(alias)}/stats`, process.env.NEXT_PUBLIC_URL);
    url.searchParams.append('stat', dataType);
    const response = await fetch(url);
    const data: { data: LinkStatsResponse<unknown> } = await response.json();

    data.data.sort((a, b) => b.count - a.count);
    return data.data;
  };

  const statsData = await getStatsData();

  return (
    <div className="bg-background-100 dark:bg-background-800 flex flex-col gap-4 rounded-lg p-4 shadow-lg md:p-6">
      <h2 className="text-xl font-semibold">{category}</h2>
      <div className="grid gap-4">
        {statsData.length > 0 ? (
          renderContent(statsData)
        ) : (
          <span className="text-center text-sm">Not enough data!</span>
        )}
      </div>
    </div>
  );
};

export default UserLinkDetailsStatsCategory;
