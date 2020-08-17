import { EventType, IPreparedTextMessage, MessageLocation } from './types';
import { Message, MessageText } from 'airgram';

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

  /* Event type */
  type: EventType = 'protest';

  /* Location from message */
  location: MessageLocation | null = null;

  /* Message permalink */
  link: string | null = null;

  constructor(readonly message: Message, readonly eventType: EventType) {
    this.chatId = message.chatId;
    this.messageId = message.id;
    this.date = message.date;

    this.text = this._parseText(message);
    this.type = eventType;
  }

  // Get text field from message
  _parseText(message: Message) {
    const typedMessage = message.content as MessageText;
    return typedMessage.text.text;
  }
}
