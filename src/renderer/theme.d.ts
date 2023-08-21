declare module '@mui/material/styles' {
  interface Theme {
    tertiary: {
      main: string;
      light: string;
      dark: string;
    };
  }

  interface PaletteOptions {
    tertiary?: {
      main?: string;
      light?: string;
      dark?: string;
    };
  }
}
