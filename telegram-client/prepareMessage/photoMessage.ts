import { Message, MessagePhoto } from 'airgram';
import {
  IPreparedPhotoMessage,
  EventType,
  Photo,
  MessageLocation,
} from './types';

// @TODO: async download photo
export default class PreparedPhotoMessage implements IPreparedPhotoMessage {
  /* Telegram chat ID */
  chatId = 0;

  /* Message ID */
  messageId = 0;

  /* Message text */
  text = '';

  /* Message timestamp */
  date = 0;

  /* Event type */
  type: EventType = 'protest';

  /* Location from message */
  location: MessageLocation | null = null;

  /* Message permalink */
  link: string | null = null;

  /* Photo from message */
  photo: Photo = {
    path: '',
    id: '',
  };

  constructor(readonly message: Message, readonly eventType: EventType) {
    this.chatId = message.chatId;
    this.messageId = message.id;
    this.date = message.date;

    this.text = this._parseText(message);
    this.type = eventType;
  }

  // Get text field from message
  _parseText(message: Message) {
    const typedMessage = message.content as MessagePhoto;
    return typedMessage.caption.text;
  }

  //   _downloadPhoto(message: Message) {}
}
