import { createTheme } from "@mui/material/styles";
import { chartPalette } from "./palette";

declare module "@mui/material/styles" {
  interface Palette {
    customBar: typeof chartPalette.customBar;
    customDonut: typeof chartPalette.customDonut;
    randomColors: typeof chartPalette.randomColors;
  }

  interface PaletteOptions {
    customBar?: Partial<typeof chartPalette.customBar>;
    customDonut?: Partial<typeof chartPalette.customDonut>;
    randomColors?: string[];
  }
}

const theme = createTheme({
  palette: {
    ...chartPalette,
  },
});

export default theme;
