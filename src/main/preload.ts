import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { Channels, IpcMessage } from 'shared/models/ipc';

const electronHandler = {
  ipcRenderer: {
    on(channel: Channels, func: (msg: IpcMessage) => void) {
      const subscription = (_event: IpcRendererEvent, msg: IpcMessage) =>
        func(msg);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (e: IpcMessage) => void) {
      ipcRenderer.once(channel, (_event, msg) => func(msg));
    },
    async sendAsync<T = any>(
      channel: Channels,
      args?: IpcMessage
    ): Promise<IpcMessage<T>> {
      const json = await ipcRenderer.invoke(channel, args);
      return { payload: JSON.parse(json) };
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
