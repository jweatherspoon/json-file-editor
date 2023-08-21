import { inject, injectable, multiInject } from 'inversify';
import { ServiceIdentifier } from '../../config/ioc/service-identifiers';
import { Channels } from '../../../shared/models/ipc';
import { Logger } from '../../util/logger';
import { MessageHandler } from '../interfaces/message-handler';

@injectable()
export class MessageHandlerFactory {
  constructor(
    @inject(ServiceIdentifier.Logger) private readonly logger: Logger,
    @multiInject(ServiceIdentifier.MessageHandler)
    private readonly handlers: MessageHandler[]
  ) {}

  getHandler(id: Channels): MessageHandler | undefined {
    const handler = this.handlers.find((x) => x.id === id);
    if (!handler) {
      this.logger.error(`Could not find message handler with id ${id}`);
    }
    return handler;
  }
}
