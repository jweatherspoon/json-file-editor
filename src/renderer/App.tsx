import { useState } from 'react';
import { Stack } from '@mui/system';
import { Box, Tab, Tabs, ThemeProvider } from '@mui/material';
import { Settings } from '@mui/icons-material';
import { theme } from './config/theme';
import { useIpc } from './hooks/useIpc';
import { Channels } from '../shared/models/ipc';
import { TabInfo } from './models/tab-info';
import AddNewConfigPage from './components/pages/add-new-config';
import FileEditorPage from './components/pages/file-editor-page';
import './App.css';

export default function App() {
  const [path, setPath] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [hasChanges, setHasChanges] = useState(false);

  const { data } = useIpc<TabInfo[]>(Channels.GetConfig);

  const navConfig = [
    ...(data ?? []),
    {
      id: 'add-new-tab',
      icon: <Settings />,
    },
  ];

  const tabId = navConfig[selectedTab].id;

  const tabs = navConfig.map((t) => {
    const labelTokens = [t.label];
    if (t.id === tabId && hasChanges) {
      labelTokens.push('*');
    }

    const label = labelTokens.join(' ');

    return (
      <Tab
        key={t.id}
        value={t.id}
        icon={t.icon && t.icon}
        label={label && label}
        disabled={t.disabled}
      />
    );
  });

  const handleChange = (id: string) => {
    setPath(null);
    setHasChanges(false);
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
        path={path}
        setPath={setPath}
      />
    );

  return (
    <ThemeProvider theme={theme}>
      <Stack direction="column" gap={2} sx={{ height: '100%' }}>
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
