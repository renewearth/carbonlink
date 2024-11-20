export interface CarbonlinkBarChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string;
  borderRadius?: number;
  borderColor?: string;
  borderWidth?: number;
  hoverBackgroundColor?: string;
  hidden?: boolean;
  barThickness?: number;
  maxBarThickness?: number;
  minBarThickness?: number;
}

export interface CarbonlinkBarChartProps {
  labels: string[];
  datasets: CarbonlinkBarChartDataset[];
  stacked?: boolean;
  onLegendClick?: (index: number) => void;
  height?: number | string;
  width?: number | string;
  formatTooltipValue?: (value: number) => string;
  yAxisTickFormatter?: (value: number) => string | number;
}
