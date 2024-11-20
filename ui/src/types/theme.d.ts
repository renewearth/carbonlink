import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    customDonut: {
      lng: string;
      lpg: string;
      diesel: string;
      electric: string;
      solidFuel: string;
      gasoline: string;
      kerosene: string;
      other: string;
    };
    customBar: {
      scope1: string;
      scope2: string;
    };
    randomColors: string[];
  }

  interface PaletteOptions {
    customDonut?: {
      lng?: string;
      lpg?: string;
      diesel?: string;
      electric?: string;
      solidFuel?: string;
      gasoline?: string;
      kerosene?: string;
      other?: string;
    };
    customBar?: {
      scope1?: string;
      scope2?: string;
    };
    randomColors?: string[];
  }
}
