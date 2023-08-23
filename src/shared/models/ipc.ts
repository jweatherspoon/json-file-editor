export enum Channels {
  GetConfig = 'get-config',
  GetFileInfo = 'get-file-info',
  LoadFile = 'load-file',
  SaveFile = 'save-file',
  OpenConfigFile = 'open-config-file',
}

export interface IpcMessage<T = any> {
  payload: T;
}
