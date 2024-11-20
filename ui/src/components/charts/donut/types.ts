import { ChartOptions } from "chart.js";
import { BaseChartProps } from "../common/types/chart";

export interface DonutDataItem {
  name: string;
  value: number;
  color?: string;
}

export interface CarbonlinkDonutChartProps extends BaseChartProps {
  data: DonutDataItem[];
  centerText?: string;
  showLegend?: boolean;
  customOptions?: Partial<ChartOptions<"doughnut">>;
  onSliceClick?: (item: DonutDataItem) => void;
}
