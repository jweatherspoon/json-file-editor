export enum Channels {
  Test = 'ipc-example',
  GetConfig = 'get-config',
  GetFileInfo = 'get-file-info',
  LoadFile = 'load-file',
}

export interface IpcMessage<T = any> {
  payload: T;
}
