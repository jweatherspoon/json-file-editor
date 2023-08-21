import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFBBE4',
      light: '#FFBBFF',
      dark: '#CB8AB2',
      contrastText: '#000000',
    },
    secondary: {
      dark: '#191919',
      main: '#3F3F3F',
      light: '#6A6A6A',
      contrastText: '#FFFFFF',
    },
    tertiary: {
      main: '#DDBE44',
      light: '#FFF075',
      dark: '#A88E07',
    },
    action: {
      disabled: {
        main: 'rgba(0, 0, 0, 0.54)',
        light: 'rgba(255, 255, 255, 0.45)',
      },
    },
  },
} as any);

export { theme };
