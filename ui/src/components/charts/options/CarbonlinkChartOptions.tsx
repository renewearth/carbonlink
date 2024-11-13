import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
  Chip,
} from "@mui/material";

export interface BaseOption {
  key: string;
  label: string;
  color?: string;
  unit?: string;
}

interface CarbonlinkChartOptionsProps {
  options: BaseOption[];
  selectedOptions: string[];
  onChange: (selected: string[]) => void;
  multiple?: boolean;
  label?: string;
  renderLabel?: (option: BaseOption) => string;
  renderChip?: (option: BaseOption) => React.ReactNode;
}

export const CarbonlinkChartOptions: React.FC<CarbonlinkChartOptionsProps> = ({
  options,
  selectedOptions,
  onChange,
  multiple = true,
  label = "Select Options",
  renderLabel = (option) =>
    option.unit ? `${option.label} (${option.unit})` : option.label,
  renderChip = (option) => (
    <Chip
      key={option.key}
      label={renderLabel(option)}
      sx={
        option.color
          ? {
              backgroundColor: option.color,
              color: "white",
            }
          : undefined
      }
    />
  ),
}) => {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    onChange(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple={multiple}
        value={selectedOptions}
        onChange={handleChange}
        label={label}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {(Array.isArray(selected) ? selected : [selected]).map((key) => {
              const option = options.find((opt) => opt.key === key);
              return option ? renderChip(option) : null;
            })}
          </Box>
        )}
      >
        {options.map((option) => (
          <MenuItem key={option.key} value={option.key}>
            {renderLabel(option)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CarbonlinkChartOptions;
