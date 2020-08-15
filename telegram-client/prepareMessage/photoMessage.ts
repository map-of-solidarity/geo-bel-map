import { Message, MessagePhoto } from 'airgram';
import {
  IPreparedPhotoMessage,
  MessageType,
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

  /* Type of message content */
  type: MessageType = 'protest';

  /* Location from message */
  location: MessageLocation | null = null;

  /* Photo from message */
  photo: Photo = {
    path: '',
    id: '',
  };

  constructor(readonly message: Message, readonly messageType: MessageType) {
    this.chatId = message.chatId;
    this.messageId = message.id;
    this.date = message.date;

    this.text = this._parseText(message);
    this.type = messageType;
  }

  // Get text field from message
  _parseText(message: Message) {
    const typedMessage = message.content as MessagePhoto;
    return typedMessage.caption.text;
  }

  //   _downloadPhoto(message: Message) {}
}
