import { Stack } from '@mui/system';
import { ThemeProvider } from '@mui/material';
import { Navigator } from './components/util/nav/navigator';
import { navigationConfig } from './config/nav';
import { theme } from './config/theme';
import MainComponent from './components/Main';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Stack direction="row">
        {/* <Navigator config={navigationConfig} /> */}
        <MainComponent />
      </Stack>
    </ThemeProvider>
  );
}
