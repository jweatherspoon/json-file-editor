import { IpcMessage } from '../../../shared/models/ipc';

export interface MessageHandler {
  id: string;
  handle(msg: IpcMessage): Promise<any>;
}
