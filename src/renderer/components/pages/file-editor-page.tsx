import { useEffect, useState } from 'react';
import { Box, Stack } from '@mui/material';
import { FileInfo } from '../../../shared/models/file-info.interface';
import { Channels } from '../../../shared/models/ipc';
import JsonHierarchy from '../hierarchy/JsonHierarchy';
import ObjectEditor from '../file-editor/object-editor';

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

  return [info, fileData];
};

const FileEditorPage = ({ id }: FileEditorPageProps) => {
  const [path, setPath] = useState<string | null>(null);
  const [fileInfo, fileData] = useFileData(id);
  const onNodeSelected = (nodeId: string) => setPath(nodeId);

  // if schema is empty, show configurator
  // if schema is not empty, show selected object

  const pathTokens = path?.split('>');
  const isLeaf =
    pathTokens &&
    Number.isFinite(parseInt(pathTokens[pathTokens.length - 1], 10));

  const node = isLeaf
    ? pathTokens.reduce(
        (o, k) => o && o[k],
        fileData ?? ({} as Record<string, any>)
      )
    : null;

  return (
    <Stack direction="row" gap={1}>
      {fileData ? (
        <JsonHierarchy
          data={fileData}
          nameField="id"
          onNodeSelected={onNodeSelected}
        />
      ) : null}
      {node && fileInfo?.schema ? (
        <ObjectEditor
          schema={fileInfo.schema}
          obj={node}
          onChange={console.log}
        />
      ) : null}
    </Stack>
  );
};

export interface FileEditorPageProps {
  id: string;
}

export default FileEditorPage;
