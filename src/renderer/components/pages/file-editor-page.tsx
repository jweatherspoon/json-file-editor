import { useEffect, useMemo, useState } from 'react';
import { Button, Stack } from '@mui/material';
import { Channels } from '../../../shared/models/ipc';
import JsonHierarchy from '../hierarchy/JsonHierarchy';
import ObjectEditor from '../file-editor/object-editor';

const getNode = (data: Record<string, any> | null, path: string | null) => {
  if (!data || !path) {
    return [];
  }

  const pathTokens = path.split('>');
  const isLeaf =
    pathTokens &&
    Number.isFinite(parseInt(pathTokens[pathTokens.length - 1], 10));

  return [pathTokens.reduce((o, k) => o && o[k], data), isLeaf];
};

const useFileData = (id: string) => {
  const [info, setInfo] = useState(null);
  const [fileData, setFileData] = useState(null);

  useEffect(() => {
    (async () => {
      const fileInfo = await window.electron.ipcRenderer.sendAsync(
        Channels.GetFileInfo,
        { payload: id }
      );

      setInfo(fileInfo.payload);

      const contents = await window.electron.ipcRenderer.sendAsync(
        Channels.LoadFile,
        { payload: fileInfo.payload.path }
      );

      const parsed = JSON.parse(contents.payload);
      setFileData(parsed);
    })();
  }, [id]);

  const updateNode = (path: string, field: string, newValue: any) => {
    const [targetNode, isLeaf] = getNode(fileData, path);
    if (!isLeaf || !targetNode) {
      return false;
    }

    const nodeCopy = structuredClone(targetNode);
    nodeCopy[field] = newValue;

    const dataCopy = structuredClone(fileData);

    let node = dataCopy;
    const pathTokens = path.split('>');
    for (let i = 0; i < pathTokens.length - 1; i++) {
      node = node![pathTokens[i]];
    }

    node![pathTokens[pathTokens.length - 1]] = nodeCopy;

    setFileData(dataCopy);
    return true;
  };

  const saveChanges = () =>
    window.electron.ipcRenderer
      .sendAsync(Channels.SaveFile, {
        payload: { path: info.path, data: fileData },
      })
      .then((result) => result.payload as boolean);

  const addNewObject = (path: string, nameField: string) => {
    if (!fileData || !path || !nameField) {
      return;
    }

    const pathTokens = path.split('>');
    const dataCopy = structuredClone(fileData);
    let parent = dataCopy;
    for (let i = 0; i < pathTokens.length - 1; i++) {
      parent = parent[pathTokens[i]];
    }

    // if parent value is an array, add the object there
    if (!Array.isArray(parent)) {
      parent = parent[pathTokens[pathTokens.length - 1]];
    }

    if (Array.isArray(parent)) {
      const newObject = { [nameField]: 'new-object' };
      parent.push(newObject);
      setFileData(dataCopy);
    }
  };

  return [info, fileData, updateNode, saveChanges, addNewObject];
};

const FileEditorPage = ({
  id,
  hasChanges,
  setHasChanges,
  path,
  setPath,
}: FileEditorPageProps) => {
  const [fileInfo, fileData, updateNode, saveChanges, addNewObject] =
    useFileData(id);
  const onNodeSelected = (nodeId: string) => setPath(nodeId);

  const [node, isLeaf] = useMemo(
    () => getNode(fileData ?? {}, path),
    [fileData, path]
  );

  const onChange = (field: string, newValue: any) => {
    const changed = updateNode(path!, field, newValue);
    if (changed) {
      setHasChanges(true);
    }
  };

  const onSave = async () => {
    const result = await saveChanges();
    if (result) {
      setHasChanges(false);
    }
  };

  return (
    <Stack
      direction="row"
      gap={1}
      sx={{ height: '90%', width: '98vw', pl: 1, pr: 1 }}
    >
      {fileData ? (
        <JsonHierarchy
          data={fileData}
          nameField="id"
          onNodeSelected={onNodeSelected}
          canAddObject={isLeaf || Array.isArray(node)}
          addObject={() => addNewObject(path, fileInfo?.nameField)}
        />
      ) : null}
      <Stack
        sx={{ height: '100%', flexGrow: 1, width: '80%', position: 'relative' }}
      >
        {isLeaf && fileInfo?.schema ? (
          <ObjectEditor
            schema={fileInfo.schema}
            obj={node}
            onChange={onChange}
          />
        ) : null}
        <Button
          disabled={!hasChanges}
          onClick={onSave}
          fullWidth
          variant="contained"
          sx={{ bottom: 2, position: 'absolute', margin: 'auto' }}
        >
          Save Changes
        </Button>
      </Stack>
    </Stack>
  );
};

export interface FileEditorPageProps {
  id: string;
  hasChanges: boolean;
  setHasChanges: (hc: boolean) => void;
  path: string | null;
  setPath: (newPath: string | null) => void;
}

export default FileEditorPage;
