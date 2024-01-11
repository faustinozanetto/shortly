export type BaseChartProps = {
  animate?: boolean;
  data: unknown[];
  labels: string[];
  title: string;
  tooltipFormat: (value: string) => string;
};
