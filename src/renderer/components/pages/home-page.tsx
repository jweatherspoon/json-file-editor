import { useState } from 'react';
import { TabInfo } from '../../models/tab-info';
import JsonHierarchy from '../hierarchy/JsonHierarchy';
import TabControl from '../tab-control/TabControl';

const HomePage = () => {
  const [tab, setTab] = useState('t1');

  const hierarchy = (
    <JsonHierarchy
      nameField="id"
      data={{
        key1: {
          subkey1: [{ id: 'child1' }, { id: 'child2' }],
        },
        key2: [{ id: 'child3' }, { id: 'child4' }],
      }}
      onNodeSelected={console.log}
    />
  );

  const tabs: TabInfo[] = [
    {
      id: 't1',
      label: 'Parser Metadata',
      hasChanges: true,
      content: hierarchy,
    },
    { id: 't2', label: 'Transform Metadata', content: hierarchy },
    { id: 't3', label: 'Unit Conversions', content: hierarchy },
  ];

  return (
    <>
      <TabControl tabs={tabs} selectedTab={tab} onTabChange={setTab} />
    </>
  );
};

export default HomePage;
