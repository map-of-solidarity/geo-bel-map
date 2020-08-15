import { Message, MessagePhoto } from 'airgram';
import { IPreparedPhotoMessage, MessageType, Photo } from './types';
import parseLocation from '../helpers/parseLocation';

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
  location = '';

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
    this.location = parseLocation(this.text) || '';
  }

  // Get text field from message
  _parseText(message: Message) {
    const typedMessage = message.content as MessagePhoto;
    return typedMessage.caption.text;
  }

  //   _downloadPhoto(message: Message) {}
}
