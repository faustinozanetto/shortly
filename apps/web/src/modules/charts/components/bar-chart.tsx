import React from 'react';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';

import ChartWrapper from './chart-wrapper';
import { useTheme } from 'next-themes';
import { BaseChartProps } from '../lib/charts-lib';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type BarChartProps = BaseChartProps & {
  colors?: {
    background: string;
    border: string;
  };
};

const BarChart: React.FC<BarChartProps> = (props) => {
  const { theme } = useTheme();

  const {
    title,
    labels,
    tooltipFormat,
    data,
    colors = {
      border: theme === 'dark' ? 'hsl(263.4, 70%, 50.4%)' : 'hsl(262.1, 83.3%, 57.8%)',
      background: theme === 'dark' ? 'hsla(263.4, 70%, 50.4%, 0.45)' : 'hsla(262.1, 83.3%, 57.8%, 0.45)',
    },
  } = props;

  const chartOptions: React.ComponentPropsWithoutRef<typeof Bar>['options'] = {
    aspectRatio: 2,
    animation: {},
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

  const chartData: React.ComponentPropsWithoutRef<typeof Bar>['data'] = {
    labels,
    datasets: [
      {
        label: title,
        data,
        borderColor: colors.border,
        backgroundColor: colors.background,
        borderRadius: 5,
      },
    ],
  };

  return (
    <ChartWrapper>
      <Bar options={chartOptions} data={chartData} />
    </ChartWrapper>
  );
};

export default BarChart;
