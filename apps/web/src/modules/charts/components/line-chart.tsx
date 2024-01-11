import React from 'react';
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import ChartWrapper from './chart-wrapper';
import { useTheme } from 'next-themes';
import { BaseChartProps } from '../lib/charts-lib';

ChartJS.register(LinearScale, CategoryScale, PointElement, LineElement, Filler, Title, Tooltip, Legend);

type LineChartProps = BaseChartProps & {
  colors?: {
    background: string;
    border: string;
  };
};

const LineChart: React.FC<LineChartProps> = (props) => {
  const { theme } = useTheme();

  const {
    title,
    labels,
    tooltipFormat,
    data,
    colors = {
      border: theme === 'dark' ? 'rgb(74, 222, 128)' : 'rgb(21, 128, 61)',
      background: theme === 'dark' ? 'rgba(74, 222, 128, 0.25)' : 'rgba(21, 128, 61, 0.35)',
    },
  } = props;

  const chartOptions: React.ComponentPropsWithoutRef<typeof Line>['options'] = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
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

    scales: {
      x: {
        ticks: {
          color: theme === 'dark' ? 'rgb(229, 229, 229)' : 'rgb(38, 38, 38)',
        },
      },
      y: {
        ticks: {
          color: theme === 'dark' ? 'rgb(229, 229, 229)' : 'rgb(38, 38, 38)',
        },
      },
    },
  };

  const chartData: React.ComponentPropsWithoutRef<typeof Line>['data'] = {
    labels,
    datasets: [
      {
        label: title,
        data,
        borderColor: colors.border,
        backgroundColor: colors.background,
        tension: 0.35,
        fill: true,
      },
    ],
  };

  return (
    <ChartWrapper>
      <Line options={chartOptions} data={chartData} />
    </ChartWrapper>
  );
};

export default LineChart;
