import ElectronStore from 'electron-store';
import { inject, injectable } from 'inversify';
import { MessageHandler } from '../interfaces/message-handler';
import { Channels, IpcMessage } from '../../../shared/models/ipc';
import { ServiceIdentifier } from '../../config/ioc/service-identifiers';

@injectable()
export class OpenConfigFileMessageHandler implements MessageHandler {
  readonly id: string = Channels.OpenConfigFile;

  constructor(
    @inject(ServiceIdentifier.Store) private readonly store: ElectronStore
  ) {}

  async handle(_msg: IpcMessage<any>): Promise<any> {
    this.store.openInEditor();
  }
}
