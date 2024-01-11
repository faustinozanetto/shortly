import React from 'react';
import LinkStatsLists from './lists/link-stats-lists';
import LinkStatsCharts from './charts/link-stats-charts';

const LinkStats: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded border p-4 shadow">
        <h2 className="leading-2 block text-xl font-bold md:text-2xl lg:text-3xl">Link Stats</h2>
      </div>
      <LinkStatsLists />
      <LinkStatsCharts />
    </div>
  );
};

export default LinkStats;
