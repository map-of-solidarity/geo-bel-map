import { Message } from 'airgram';
import { prepareMessageType, MessageType } from './types';
import PreparedTextMessage from './textMessage';
import PreparedPhotoMessage from './photoMessage';

export const prepareMessage: prepareMessageType = (
  message: Message,
  messageType: MessageType,
) => {
  const contentType = message.content._;

  switch (contentType) {
    case 'messageText':
      return new PreparedTextMessage(message, messageType);
    case 'messagePhoto':
      return new PreparedPhotoMessage(message, messageType);
    default:
      return null;
  }
};
