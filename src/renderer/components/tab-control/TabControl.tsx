import { useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { TabInfo } from '../../models/tab-info';

const TabControl = ({ tabs }: TabControlProps) => {
  const [selectedTab, setSelectedTab] = useState('');
  const handleChange = (_, id: string) => setSelectedTab(id);

  const tabComponents = tabs.map((t) => (
    <Tab
      key={t.id}
      value={t.id}
      label={`${t.label}${t.hasChanges ? '*' : ''}`}
    />
  ));

  const tabPanels = tabs.map((t) => (
    <TabPanel key={`${t.id}-panel`} value={t.id}>
      {t.label}
    </TabPanel>
  ));

  return (
    <TabContext value={selectedTab}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          {tabComponents}
        </TabList>
      </Box>
      {tabPanels}
    </TabContext>
  );
};

export interface TabControlProps {
  tabs: TabInfo[];
}

export default TabControl;
