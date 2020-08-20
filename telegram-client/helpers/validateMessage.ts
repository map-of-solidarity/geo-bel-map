import { EventType } from "../prepareMessage/types";
import { Message } from "airgram";
import { filterChannel } from '../middleware/filterChannel';
import { recognizeType } from './recognizeType';
import textParser from './textParser';

export const validateMessage = (
  message: Message,
): { message: Message; eventType: EventType } | false => {
  const messageFiltered = filterChannel(message);
  if (messageFiltered === null) {
    console.log('[Message skipped. Reason: unnecessary channel]');
    return false;
  }

  // Check type of message and parse text
  const messageText = textParser(messageFiltered);
  if (messageText === null) {
    console.log('[Message skipped. Reason: not supported message type]');
    return false;
  }

  // Check if message has hashtags & get type of message content
  const eventType = recognizeType(messageText);
  if (eventType === null) {
    console.log('[Message skipped. Reason: hashtag not found]');
    return false;
  }

  return {
    message: messageFiltered,
    eventType: eventType,
  };
};