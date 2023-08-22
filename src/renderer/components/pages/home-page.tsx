import JsonHierarchy from '../hierarchy/JsonHierarchy';
import TabControl from '../tab-control/TabControl';

const HomePage = () => (
  <>
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
    <TabControl
      tabs={[
        { id: 't1', label: 'Parser Metadata', hasChanges: true },
        { id: 't2', label: 'Transform Metadata' },
        { id: 't3', label: 'Unit Conversions' },
      ]}
    />
  </>
);

export default HomePage;
