import hashtags from '../config/hashtags';
import { EventType } from '../prepareMessage/types';

export const recognizeType = (text: string): EventType | null => {
  const hashTagRegex = /(^|\s)(#[a-zA-Zа-яА-Я\d-]+)/gm;
  const hashes = text.match(hashTagRegex);
  if (hashes === null || hashes.length === 0) {
    return null;
  }

  let messageType: EventType | null = null;

  hashes.map((hash) => {
    const preparedHash = hash.replace('#', '').trim();
    const types = Object.keys(hashtags);

    types.map((type) => {
      const typedMessageType = type as EventType;

      if (hashtags[typedMessageType].includes(preparedHash)) {
        messageType = typedMessageType;
      }
    });
  });

  return messageType;
};
