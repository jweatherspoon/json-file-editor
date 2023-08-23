// import ElectronStore from 'electron-store';
import { writeFile } from 'fs/promises';
import { injectable } from 'inversify';
import { MessageHandler } from '../interfaces/message-handler';
import { Channels, IpcMessage } from '../../../shared/models/ipc';

@injectable()
export class SaveFileMessageHandler implements MessageHandler {
  readonly id: string = Channels.SaveFile;

  // constructor(private readonly store: ElectronStore) {}

  async handle(msg: IpcMessage<any>): Promise<any> {
    try {
      const { path, data } = msg.payload;
      await writeFile(path, JSON.stringify(data, undefined, 2));
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
