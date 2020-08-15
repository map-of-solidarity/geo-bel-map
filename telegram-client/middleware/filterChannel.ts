import { Message } from 'airgram';
import { channels } from '../config/channels';

export const filterChannel = (message: Message): Message | null => {
  if (channels.includes(message.chatId)) {
    return message;
  }

  return null;
};
