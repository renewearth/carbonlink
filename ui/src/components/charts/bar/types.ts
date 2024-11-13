import { BaseChartProps, Dataset } from "../common/types";

export interface CarbonlinkBarChartProps extends BaseChartProps {
  labels: string[];
  datasets: Dataset[];
  stacked?: boolean;
  onLegendClick?: (datasetIndex: number) => void;
}
