import React from 'react';
import LinkStatsChartsCategory, { LinkStatsChartsCategoryProps } from './link-stats-charts-category';
import { ANALYTICS_CATEGORIES } from '@modules/analytics/lib/analytics.constants';
import { capitalize } from '@modules/common/lib/common.lib';

const LINK_STATS_CHARTS: LinkStatsChartsCategoryProps[] = [
  {
    title: 'Countries Chart',
    categoryType: 'country',
  },
  {
    title: 'Browsers Chart',
    categoryType: 'browser',
  },
  {
    title: 'Devices Chart',
    categoryType: 'device',
  },
  {
    title: 'Os Chart',
    categoryType: 'os',
  },
];

const LinkStatsCharts: React.FC = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {LINK_STATS_CHARTS.map((statChart) => {
        return <LinkStatsChartsCategory key={statChart.categoryType} {...statChart} />;
      })}
    </div>
  );
};

export default LinkStatsCharts;
