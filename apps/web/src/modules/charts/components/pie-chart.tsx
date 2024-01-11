import React from 'react';
import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import ChartWrapper from './chart-wrapper';
import { useTheme } from 'next-themes';
import { BaseChartProps } from '../lib/charts-lib';

ChartJS.register(ArcElement, Title, Tooltip, Legend);

export type PieChartProps = BaseChartProps & {
  colors?: {
    background: string[];
    border: string[];
  };
};

const PieChart: React.FC<PieChartProps> = (props) => {
  const { theme } = useTheme();

  const {
    title,
    labels,
    tooltipFormat,
    data,
    colors = {
      border: theme === 'dark' ? 'hsl(263.4, 70%, 50.4%)' : 'hsl(262.1, 83.3%, 57.8%)',
      background: theme === 'dark' ? 'hsla(263.4, 70%, 50.4%, 0.25)' : 'hsla(262.1, 83.3%, 57.8%, 0.35)',
    },
    animate = false,
  } = props;

  const chartOptions: React.ComponentPropsWithoutRef<typeof Pie>['options'] = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
    animation: { animateRotate: animate, animateScale: animate },
    plugins: {
      tooltip: {
        callbacks: {
          label: (item) => tooltipFormat(item.formattedValue),
        },
      },
      legend: {
        display: true,
      },
    },
  };

  const chartData: React.ComponentPropsWithoutRef<typeof Pie>['data'] = {
    labels,
    datasets: [
      {
        label: title,
        data,
        borderColor: colors.border,
        backgroundColor: colors.background,
      },
    ],
  };

  return (
    <ChartWrapper>
      <Pie options={chartOptions} data={chartData} />
    </ChartWrapper>
  );
};

export default PieChart;
