import React from "react";
import { Snackbar, SnackbarProps, Alert, AlertProps } from "@mui/material";

export interface CarbonlinkSnackbarProps extends SnackbarProps {
  severity?: AlertProps["severity"];
  message: string;
}

const CarbonlinkSnackbar: React.FC<CarbonlinkSnackbarProps> = ({
  severity = "info",
  message,
  onClose,
  ...props
}) => {
  const handleAlertClose = (event: React.SyntheticEvent) => {
    if (onClose) {
      // Snackbar의 onClose에 맞는 형식으로 호출
      onClose(event, "clickaway");
    }
  };

  return (
    <Snackbar {...props} onClose={onClose}>
      <Alert severity={severity} onClose={handleAlertClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CarbonlinkSnackbar;
