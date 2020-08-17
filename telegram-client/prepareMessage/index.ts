import { Message } from 'airgram';
import { prepareMessageType, EventType } from './types';
import PreparedTextMessage from './textMessage';
import PreparedPhotoMessage from './photoMessage';

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
