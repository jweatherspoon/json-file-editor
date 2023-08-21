export enum Channels {
  Test = 'ipc-example',
}

export interface IpcMessage<T = any> {
  payload: T;
}
