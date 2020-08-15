import { Message, MessageText } from 'airgram';
import { IPreparedTextMessage, MessageType } from './types';
import parseLocation from '../helpers/parseLocation';

export default class PreparedTextMessage implements IPreparedTextMessage {
  chatId = 0;
  messageId = 0;
  text = '';
  date = 0;
  type: MessageType = 'protest';
  location = '';

  constructor(readonly message: Message, readonly messageType: MessageType) {
    this.chatId = message.chatId;
    this.messageId = message.id;
    this.date = message.date;

    this.text = this._parseText(message);
    this.type = messageType;
    this.location = parseLocation(this.text) || '';
  }

  _parseText(message: Message) {
    const typedMessage = message.content as MessageText;
    return typedMessage.text.text;
  }
}
