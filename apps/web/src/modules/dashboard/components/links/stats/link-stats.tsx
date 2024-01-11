import React from 'react';
import LinkStatsLists from './lists/link-stats-lists';
import LinkStatsCharts from './charts/link-stats-charts';

const LinkStats: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <LinkStatsLists />
      <LinkStatsCharts />
    </div>
  );
};

export default LinkStats;
