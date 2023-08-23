import { ExpandMore, ChevronRight, Add, CopyAll } from '@mui/icons-material';
import { TreeItem, TreeView } from '@mui/lab';
import { Button, ButtonGroup, Stack, Tooltip } from '@mui/material';

const JsonHierarchy = ({
  nameField,
  data,
  onNodeSelected,
  addObject,
  canAddObject,
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

  const copyJsonToClipboard = async () => {
    if (!data) {
      console.error('No data to copy!');
      return;
    }

    navigator.clipboard.writeText(JSON.stringify(data));
  };

  return (
    <Stack sx={{ height: '100%' }}>
      <ButtonGroup variant="contained" sx={{ justifyContent: 'flex-end' }}>
        <Tooltip title="Copy JSON to clipboard">
          <Button onClick={copyJsonToClipboard}>
            <CopyAll />
          </Button>
        </Tooltip>
        <Tooltip title="Add new object">
          <Button onClick={addObject} disabled={!canAddObject}>
            <Add />
          </Button>
        </Tooltip>
      </ButtonGroup>
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
    </Stack>
  );
};

export interface JsonHierarchyProps {
  nameField: string;
  data: Record<string, unknown>;
  onNodeSelected: (nodeId: string) => void;
  canAddObject: boolean;
  addObject: () => void;
}

export default JsonHierarchy;
