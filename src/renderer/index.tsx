import { createRoot } from 'react-dom/client';
import App from './App';
import { Channels } from '../shared/models/ipc';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<App />);

window.electron.ipcRenderer
  .sendAsync(Channels.Test, { payload: 'ping' })
  .then((x) => console.log(x.payload));
