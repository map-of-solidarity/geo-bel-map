import { Message, MessageText } from 'airgram';
import { IPreparedTextMessage, MessageType } from './types';
import parseLocation from '../helpers/parseLocation';

export default class PreparedTextMessage implements IPreparedTextMessage {
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
    const typedMessage = message.content as MessageText;
    return typedMessage.text.text;
  }
}
