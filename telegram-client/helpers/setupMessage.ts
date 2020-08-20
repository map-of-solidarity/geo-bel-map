import { EventType } from '../prepareMessage/types';
import { Message } from 'airgram';
import PreparedPhotoMessage from '../prepareMessage/photoMessage';
import PreparedTextMessage from '../prepareMessage/textMessage';
import { prepareMessage } from '../prepareMessage';
import withLink from './with-link';
import withLocation from './with-location';

export const setupMessage = async (
  message: Message,
  eventType: EventType,
): Promise<PreparedTextMessage | PreparedPhotoMessage | false> => {
  // Convert unix timestamp to milliseconds
  message.date = message.date * 1000;

  const preparedMessage = prepareMessage(message, eventType);
  if (prepareMessage === null) {
    console.log("[Message skipped. Reason: message can't be prepared]");
    return false;
  }

  const readyMessage = await withLocation(preparedMessage).then((message) =>
    withLink(message),
  );

  return readyMessage;
};
