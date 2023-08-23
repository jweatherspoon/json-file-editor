import { Box, Button } from '@mui/material';
import { Channels } from '../../../shared/models/ipc';

const AddNewConfigPage = () => {
  const openConfigFile = () =>
    window.electron.ipcRenderer.sendAsync(Channels.OpenConfigFile);

  return (
    <Box
      direction="row"
      gap={1}
      sx={{ height: '90%', width: '98vw', pl: 1, pr: 1 }}
    >
      <Button variant="contained" fullWidth onClick={openConfigFile}>
        Open Config File
      </Button>
    </Box>
  );
};

export default AddNewConfigPage;
