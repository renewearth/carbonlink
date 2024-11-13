export interface ColumnConfig<T> {
  key: keyof T;
  label: string;
  format?: (value: any) => string;
}

export interface CarbonlinkTableProps<T> {
  data: T[];
  columns: ColumnConfig<T>[];
  rowKey: keyof T;
  transpose?: boolean;
  onRowClick?: (row: T) => void;
}
