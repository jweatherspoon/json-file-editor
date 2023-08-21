import { Container } from 'inversify';
import { ServiceIdentifier } from './service-identifiers';
import { Logger } from '../../util/logger';
import { Ipc } from '../../communication/ipc';
import {
  MessageHandlerFactory,
  messageHandlers,
} from '../../communication/message-handlers';
import { MessageHandler } from '../../communication/interfaces/message-handler';

const ioc = new Container();

ioc.bind(ServiceIdentifier.Logger).to(Logger).inSingletonScope();
ioc.bind(ServiceIdentifier.Ipc).to(Ipc).inSingletonScope();

ioc
  .bind(ServiceIdentifier.MessageHandlerFactory)
  .to(MessageHandlerFactory)
  .inSingletonScope();

messageHandlers.forEach((messageHandler) =>
  ioc
    .bind<MessageHandler>(ServiceIdentifier.MessageHandler)
    .to(messageHandler)
    .inSingletonScope()
);

export { ioc };
