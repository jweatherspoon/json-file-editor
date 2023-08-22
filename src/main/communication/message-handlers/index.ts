import { ExampleMessageHandler } from './example-message-handler';
import { GetConfigMessageHandler } from './get-config-handler';
import { GetFileInfoMessageHandler } from './get-file-info-handler';
import { LoadFileMessageHandler } from './load-file-handler';

export const messageHandlers = [
  ExampleMessageHandler,
  GetConfigMessageHandler,
  GetFileInfoMessageHandler,
  LoadFileMessageHandler,
];

export { MessageHandlerFactory } from './message-handler-factory';
