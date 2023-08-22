import { readFile } from 'fs/promises';
import { injectable } from 'inversify';
import { MessageHandler } from '../interfaces/message-handler';
import { Channels, IpcMessage } from '../../../shared/models/ipc';

@injectable()
export class LoadFileMessageHandler implements MessageHandler {
  readonly id: string = Channels.LoadFile;

  async handle(msg: IpcMessage<any>): Promise<any> {
    try {
      const content = await readFile(msg.payload, { encoding: 'utf-8' });
      return content;
    } catch {
      return null;
    }
  }
}
