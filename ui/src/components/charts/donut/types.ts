import { BaseChartProps } from "../common/types/chart";

export interface DonutDataItem {
  key: string;
  value: number;
  label: string;
  color?: string;
}

export interface CarbonlinkDonutChartProps extends BaseChartProps {
  data: DonutDataItem[];
  centerText?: string;
  showLegend?: boolean;
  showLabels?: boolean;
  onSliceClick?: (item: DonutDataItem) => void;
  innerRadius?: number;
  outerRadius?: number;
}
