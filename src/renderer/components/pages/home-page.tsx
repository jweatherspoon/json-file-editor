import JsonHierarchy from '../hierarchy/JsonHierarchy';

const HomePage = () => (
  <JsonHierarchy
    nameField="id"
    data={{
      key1: {
        subkey1: [{ id: 'child1' }, { id: 'child2' }],
      },
      key2: [{ id: 'child3' }, { id: 'child4' }],
    }}
    onNodeSelected={(e, n) => console.log(e, n)}
  />
);

export default HomePage;
