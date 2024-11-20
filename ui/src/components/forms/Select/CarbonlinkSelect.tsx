// src/components/forms/Select/CarbonlinkSelect.tsx
import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

export interface CarbonlinkSelectProps {
  options: { value: string | number; label: string }[];
  value: string | number;
  label: string;
  onChange: (value: string | number) => void;
}

const CarbonlinkSelect: React.FC<CarbonlinkSelectProps> = ({
  options,
  value,
  onChange,
  label,
  ...props
}) => {
  const handleChange = (event: SelectChangeEvent<string | number>) => {
    onChange(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={handleChange} {...props}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CarbonlinkSelect;
