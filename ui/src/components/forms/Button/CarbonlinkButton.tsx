import React from "react";
import { Button, ButtonProps } from "@mui/material";

export interface CarbonlinkButtonProps extends ButtonProps {
  label: string;
}

const CarbonlinkButton: React.FC<CarbonlinkButtonProps> = ({
  label,
  ...props
}) => {
  return (
    <Button {...props} variant="contained">
      {label}
    </Button>
  );
};

export default CarbonlinkButton;
