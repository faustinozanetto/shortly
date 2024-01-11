import React from 'react';
import PieChart from '@modules/charts/components/pie-chart';
import { useUserDashboardLinkStore } from '@modules/dashboard/state/user-dashboard-link.slice';
import { AnalyticsCategoryType } from '@modules/analytics/types/analytics.types';

export type LinkStatsChartsCategoryProps = {
  title: string;
  categoryType: AnalyticsCategoryType;
};

const LinkStatsChartsCategory: React.FC<LinkStatsChartsCategoryProps> = (props) => {
  const { title, categoryType } = props;
  const { stats } = useUserDashboardLinkStore();

  const data = Object.values(stats[categoryType]).map((entry) => entry.count);
  const labels = Object.values(stats[categoryType]).map((entry) => entry.entry as string);

  return (
    <div className="flex flex-col gap-2 rounded border p-4 shadow">
      <h2 className="text-xl font-semibold">{title}</h2>
      {data.length > 0 ? (
        <PieChart title={title} labels={labels} data={data} tooltipFormat={(value) => value} animate />
      ) : (
        <p className="text-sm">Not enough data to display information!</p>
      )}
    </div>
  );
};

export default LinkStatsChartsCategory;
