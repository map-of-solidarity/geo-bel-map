import { Message, MessagePhoto } from 'airgram';
import { IPreparedPhotoMessage, MessageType, Photo } from './types';
import parseLocation from '../helpers/parseLocation';

// @TODO: async download photo
export default class PreparedPhotoMessage implements IPreparedPhotoMessage {
  chatId = 0;
  messageId = 0;
  text = '';
  date = 0;
  type: MessageType = 'protest';
  location = '';
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

  _parseText(message: Message) {
    const typedMessage = message.content as MessagePhoto;
    return typedMessage.caption.text;
  }

  //   _downloadPhoto(message: Message) {}
}
