import { EventType, IPrepareMessageType } from './types';

import { Message } from 'airgram';
import PreparedPhotoMessage from './photoMessage';
import PreparedTextMessage from './textMessage';
import PreparedVideoMessage from './videoMessage';

export const prepareMessage: IPrepareMessageType = (
  message: Message,
  eventType: EventType,
) => {
  const contentType = message.content._;

  switch (contentType) {
    case 'messageText':
      return new PreparedTextMessage(message, eventType);
    case 'messagePhoto':
      return new PreparedPhotoMessage(message, eventType);
    case 'messageVideo':
      return new PreparedVideoMessage(message, eventType);
    default:
      return null;
  }
};
