import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { FileInfo } from '../../../shared/models/file-info.interface';
import { Channels } from '../../../shared/models/ipc';
import JsonHierarchy from '../hierarchy/JsonHierarchy';

const useFileData = (id: string) => {
  const [fileData, setFileData] = useState(null);

  useEffect(() => {
    (async () => {
      const fileInfo = await window.electron.ipcRenderer.sendAsync(
        Channels.GetFileInfo,
        { payload: id }
      );

      const contents = await window.electron.ipcRenderer.sendAsync(
        Channels.LoadFile,
        { payload: fileInfo.payload.path }
      );

      const parsed = JSON.parse(contents.payload);
      setFileData(parsed);
    })();
  }, [id]);

  return fileData;
};

const FileEditorPage = ({ id }: FileEditorPageProps) => {
  const fileData = useFileData(id);
  const onNodeSelected = (nodeId: string) => console.log(nodeId);

  // if schema is empty, show configurator
  // if schema is not empty, show selected object

  return (
    <Box>
      {fileData ? (
        <JsonHierarchy
          data={fileData}
          nameField="id"
          onNodeSelected={onNodeSelected}
        />
      ) : null}
    </Box>
  );
};

export interface FileEditorPageProps {
  id: string;
}

export default FileEditorPage;
