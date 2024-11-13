import { useTheme } from "@mui/material/styles";

export const useChartTheme = () => {
  const theme = useTheme();

  return {
    backgroundColor: theme.palette.background.paper,
    textColor: theme.palette.text.primary,
    secondaryTextColor: theme.palette.text.secondary,
    fontFamily: theme.typography.fontFamily,
    gridColor: theme.palette.divider,
    fontSize: 12,
  };
};
