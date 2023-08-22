import ElectronStore from 'electron-store';
import { inject, injectable } from 'inversify';
import { MessageHandler } from '../interfaces/message-handler';
import { Channels, IpcMessage } from '../../../shared/models/ipc';
import { ServiceIdentifier } from '../../config/ioc/service-identifiers';

@injectable()
export class GetFileInfoMessageHandler implements MessageHandler {
  readonly id: string = Channels.GetFileInfo;

  constructor(
    @inject(ServiceIdentifier.Store) private readonly store: ElectronStore
  ) {}

  async handle(msg: IpcMessage<any>): Promise<any> {
    const key = `fileInfo.${msg.payload}`;
    const info = this.store.get(key, {
      path: null,
      schema: [],
      nameField: null,
    });

    return info;
  }
}
