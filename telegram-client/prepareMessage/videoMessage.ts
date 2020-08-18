import { EventType, IPreparedVideoMessage, MessageLocation } from './types';
import { Message, MessageVideo, Video } from 'airgram';

export default class PreparedVideoMessage implements IPreparedVideoMessage {
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
    const typedMessage = message.content as MessageVideo;
    return typedMessage.caption.text;
  }

  //   _downloadPhoto(message: Message) {}
}
