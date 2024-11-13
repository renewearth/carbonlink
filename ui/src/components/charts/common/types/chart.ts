export interface BaseChartProps {
  width?: number;
  height?: number;
}

export interface Dataset {
  label: string;
  data: (number | null)[];
  backgroundColor: string;
}
