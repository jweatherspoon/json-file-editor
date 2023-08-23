import { useState } from 'react';
import { Stack } from '@mui/system';
import { Box, Tab, Tabs, ThemeProvider } from '@mui/material';
import { theme } from './config/theme';
import { useIpc } from './hooks/useIpc';
import { Channels } from '../shared/models/ipc';
import { TabInfo } from './models/tab-info';
import AddNewConfigPage from './components/pages/add-new-config';
import FileEditorPage from './components/pages/file-editor-page';

export default function App() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [hasChanges, setHasChanges] = useState(false);

  const { isLoading, data } = useIpc<TabInfo[]>(Channels.GetConfig);

  const navConfig = [
    ...(data ?? []),
    {
      id: 'add-new-tab',
      label: '+',
    },
  ];

  const tabId = navConfig[selectedTab].id;

  const tabs = navConfig.map((t) => (
    <Tab key={t.id} value={t.id} label={`${t.label}${hasChanges ? '*' : ''}`} />
  ));

  const handleChange = (id: string) => {
    const newTabIndex = navConfig.findIndex((t) => t.id === id);
    setSelectedTab(newTabIndex);
  };

  const content =
    tabId === 'add-new-tab' ? (
      <AddNewConfigPage />
    ) : (
      <FileEditorPage
        id={tabId}
        hasChanges={hasChanges}
        setHasChanges={setHasChanges}
      />
    );

  return (
    <ThemeProvider theme={theme}>
      <Stack direction="column" gap={2}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabId} onChange={(_, id) => handleChange(id)}>
            {tabs}
          </Tabs>
        </Box>
        {content}
      </Stack>
    </ThemeProvider>
  );
}
