import { GetConfigMessageHandler } from './get-config-handler';
import { GetFileInfoMessageHandler } from './get-file-info-handler';
import { LoadFileMessageHandler } from './load-file-handler';
import { OpenConfigFileMessageHandler } from './open-config-file-handler';
import { SaveFileMessageHandler } from './save-file-handler';

export const messageHandlers = [
  GetConfigMessageHandler,
  GetFileInfoMessageHandler,
  LoadFileMessageHandler,
  SaveFileMessageHandler,
  OpenConfigFileMessageHandler,
];

export { MessageHandlerFactory } from './message-handler-factory';
