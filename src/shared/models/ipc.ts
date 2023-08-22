export enum Channels {
  Test = 'ipc-example',
  GetConfig = 'get-config',
}

export interface IpcMessage<T = any> {
  payload: T;
}
