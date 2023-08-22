import { ExampleMessageHandler } from './example-message-handler';
import { GetConfigMessageHandler } from './get-config-handler';

export const messageHandlers = [ExampleMessageHandler, GetConfigMessageHandler];

export { MessageHandlerFactory } from './message-handler-factory';
