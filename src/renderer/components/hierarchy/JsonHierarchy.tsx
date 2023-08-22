import { ExpandMore, ChevronRight } from '@mui/icons-material';
import { TreeItem, TreeView } from '@mui/lab';

const JsonHierarchy = ({
  nameField,
  data,
  onNodeSelected,
}: JsonHierarchyProps) => {
  const renderTree = (node: any, path?: string[]) => {
    path ??= [];
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
      return node.map((n) => {
        const id = [...path, n[nameField]].join('>');
        return <TreeItem key={id} nodeId={id} label={n[nameField]} />;
      });
    }

    return null;
  };

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMore />}
      defaultExpandIcon={<ChevronRight />}
      onNodeSelect={onNodeSelected}
      sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      {renderTree(data)}
    </TreeView>
  );
};

export interface JsonHierarchyProps {
  nameField: string;
  data: Record<string, unknown>;
  onNodeSelected: (event: React.SyntheticEvent, nodeIds: string[]) => void;
}

export default JsonHierarchy;
