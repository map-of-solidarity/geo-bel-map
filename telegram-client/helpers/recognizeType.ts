import hashtags from '../config/hashtags';
import { MessageType } from '../prepareMessage/types';

export const recognizeType = (text: string): MessageType | null => {
  const hashTagRegex = /(^|\s)(#[a-zA-Zа-яА-Я\d-]+)/gm;
  const hashes = text.match(hashTagRegex);
  if (hashes === null || hashes.length === 0) {
    return null;
  }

  let messageType: MessageType | null = null;

  hashes.map((hash) => {
    const preparedHash = hash.replace('#', '').trim();
    const types = Object.keys(hashtags);

    types.map((type) => {
      const typedMessageType = type as MessageType;

      if (hashtags[typedMessageType].includes(preparedHash)) {
        messageType = typedMessageType;
      }
    });
  });

  return messageType;
};
