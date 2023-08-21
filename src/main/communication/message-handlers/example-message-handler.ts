import { injectable } from 'inversify';
import { Channels, IpcMessage } from '../../../shared/models/ipc';
import { MessageHandler } from '../interfaces/message-handler';

@injectable()
export class ExampleMessageHandler implements MessageHandler {
  readonly id: string = Channels.Test;

  async handle(data: IpcMessage): Promise<any> {
    return 'Pong!';
  }
}
