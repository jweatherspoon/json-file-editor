import ElectronStore from 'electron-store';
import { inject, injectable } from 'inversify';
import { MessageHandler } from '../interfaces/message-handler';
import { Channels, IpcMessage } from '../../../shared/models/ipc';
import { ServiceIdentifier } from '../../config/ioc/service-identifiers';

@injectable()
export class GetConfigMessageHandler implements MessageHandler {
  readonly id: string = Channels.GetConfig;

  constructor(
    @inject(ServiceIdentifier.Store) private readonly store: ElectronStore
  ) {}

  async handle(msg: IpcMessage<any>): Promise<any> {
    const configs = this.store.get('config', {}) as Record<string, any>;
    if (msg.payload) {
      return configs?.[msg.payload] ?? {};
    }

    return configs;
  }
}
