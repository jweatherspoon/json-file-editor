import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { TabInfo } from '../../models/tab-info';

const TabControl = ({ tabs, selectedTab, onTabChange }: TabControlProps) => {
  const handleChange = (_, id: string) => onTabChange(id);

  const tabComponents = tabs.map((t) => (
    <Tab
      key={t.id}
      value={t.id}
      label={`${t.label}${t.hasChanges ? '*' : ''}`}
    />
  ));

  const tabPanels = tabs.map((t) => (
    <TabPanel key={`${t.id}-panel`} value={t.id}>
      {t.content}
    </TabPanel>
  ));

  return (
    <TabContext value={selectedTab}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange}>{tabComponents}</TabList>
      </Box>
      {tabPanels}
    </TabContext>
  );
};

export interface TabControlProps {
  tabs: TabInfo[];
  selectedTab: string;
  onTabChange: (id: string) => void;
}

export default TabControl;
