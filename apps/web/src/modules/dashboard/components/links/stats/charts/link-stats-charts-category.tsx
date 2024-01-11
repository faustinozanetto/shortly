import React, { useMemo } from 'react';
import PieChart, { PieChartProps } from '@modules/charts/components/pie-chart';
import { useUserDashboardLinkStore } from '@modules/dashboard/state/user-dashboard-link.slice';
import { AnalyticsCategoryType } from '@modules/analytics/types/analytics.types';
import { Skeleton } from '@modules/ui/components/skeleton/skeleton';

export type LinkStatsChartsCategoryProps = {
  title: string;
  categoryType: AnalyticsCategoryType;
};

const LinkStatsChartsCategory: React.FC<LinkStatsChartsCategoryProps> = (props) => {
  const { title, categoryType } = props;
  const { stats, statsIsLoading } = useUserDashboardLinkStore();

  const data = Object.values(stats[categoryType]).map((entry) => entry.count);
  const labels = Object.values(stats[categoryType]).map((entry) => entry.entry as string);

  const getColorFromEntry = (str: string, alpha = 1.0) => {
    // Simple hashing algorithm
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Converting hash to HSL values
    const hue = ((hash % 360) + 360) % 360; // Ensure hue is within [0, 360)
    const saturation = 50;
    const lightness = 50;

    // Return HSL color as a string
    return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
  };

  const colors = useMemo(() => {
    let computedColors: PieChartProps['colors'] = { background: [], border: [] };

    for (const entry of stats[categoryType]) {
      const color = getColorFromEntry(entry.entry as string, 0.45);
      computedColors.border.push(color);
      computedColors.background.push(color);
    }

    return computedColors;
  }, [stats[categoryType]]);

  return (
    <div className="flex flex-col gap-1 rounded border p-4 shadow">
      {statsIsLoading[categoryType] ? (
        <Skeleton className="h-5 w-40" />
      ) : (
        <h2 className="text-lg font-semibold">{title}</h2>
      )}

      {data.length > 0 ? (
        <PieChart title={title} labels={labels} data={data} tooltipFormat={(value) => value} colors={colors} animate />
      ) : null}

      {statsIsLoading[categoryType] && data.length === 0 ? <Skeleton className="h-20 w-full" /> : null}

      {!statsIsLoading[categoryType] && stats[categoryType] && stats[categoryType].length === 0 ? (
        <p className="text-sm">Not enough data to display information!</p>
      ) : null}
    </div>
  );
};

export default LinkStatsChartsCategory;
