import React from "react";
import { Typography, Box, Paper, SxProps } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export interface CarbonlinkNoDataProps {
  icon?: React.ReactNode;
  message?: string;
  sx?: SxProps;
  textStyle?: SxProps;
  iconStyle?: SxProps;
}

export const CarbonlinkNoData: React.FC<CarbonlinkNoDataProps> = ({
  icon = <WarningAmberIcon sx={{ fontSize: 200 }} />,
  message = "데이터가 없습니다.",
  sx = {},
  textStyle = { fontWeight: "bold", marginTop: 2 },
  iconStyle = {},
}) => {
  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2, height: "100%", ...sx }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Box sx={iconStyle}>{icon}</Box>
          <Typography variant="h6" sx={textStyle}>
            {message}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default CarbonlinkNoData;
