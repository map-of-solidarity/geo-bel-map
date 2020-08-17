import { EventType, prepareMessageType } from './types';

import { Message } from 'airgram';
import PreparedPhotoMessage from './photoMessage';
import PreparedTextMessage from './textMessage';

export const prepareMessage: prepareMessageType = (
  message: Message,
  eventType: EventType,
) => {
  const contentType = message.content._;

  switch (contentType) {
    case 'messageText':
      return new PreparedTextMessage(message, eventType);
    case 'messagePhoto':
      return new PreparedPhotoMessage(message, eventType);
    default:
      return null;
  }
};
