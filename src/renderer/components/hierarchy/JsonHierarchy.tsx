import { ExpandMore, ChevronRight } from '@mui/icons-material';
import { TreeItem, TreeView } from '@mui/lab';

const JsonHierarchy = ({
  nameField,
  data,
  onNodeSelected,
}: JsonHierarchyProps) => {
  const renderTree = (node: any, path: string[] = []) => {
    if (typeof node === 'object' && !Array.isArray(node) && node !== null) {
      const children = Object.entries(node);
      return children.map(([key, val]) => {
        const currentPath = [...path, key];
        const id = currentPath.join('>');
        return (
          <TreeItem key={id} nodeId={id} label={key}>
            {renderTree(val, currentPath)}
          </TreeItem>
        );
      });
    }

    if (Array.isArray(node)) {
      return node.map((n, i) => {
        const id = [...path, i].join('>');
        return <TreeItem key={id} nodeId={id} label={n[nameField]} />;
      });
    }

    return null;
  };

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMore />}
      defaultExpandIcon={<ChevronRight />}
      onNodeSelect={(_, nodeId: string) => onNodeSelected(nodeId)}
      sx={{
        height: '100%',
        minWidth: 250,
        flexGrow: 1,
        maxWidth: 250,
        overflowY: 'auto',
        border: '1px solid black',
      }}
    >
      {renderTree(data)}
    </TreeView>
  );
};

export interface JsonHierarchyProps {
  nameField: string;
  data: Record<string, unknown>;
  onNodeSelected: (nodeId: string) => void;
}

export default JsonHierarchy;
