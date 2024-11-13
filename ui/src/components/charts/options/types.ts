import { BaseOption } from "../../../types/common";

export interface CarbonlinkChartOptionsProps {
  options: BaseOption[];
  selectedOptions: string[];
  onChange: (selected: string[]) => void;
  multiple?: boolean;
  label?: string;
  renderLabel?: (option: BaseOption) => string;
  renderChip?: (option: BaseOption) => React.ReactNode;
}
