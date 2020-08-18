import { Message, MessagePhoto, MessageText, MessageVideo } from 'airgram';

const textParser = (message: Message): string | null => {
  const messageType = message.content._;

  if (messageType === 'messageText') {
    const typedMessage = message.content as MessageText;
    return typedMessage.text.text;
  }

  if (messageType === 'messagePhoto') {
    const typedMessage = message.content as MessagePhoto;
    return typedMessage.caption.text;
  }

  if (messageType === 'messageVideo') {
    const typedMessage = message.content as MessageVideo;
    return typedMessage.caption.text;
  }

  return null;
};

export default textParser;
