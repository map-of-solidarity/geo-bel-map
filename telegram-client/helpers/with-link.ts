import PreparedPhotoMessage from '../prepareMessage/photoMessage';
import PreparedTextMessage from '../prepareMessage/textMessage';
import { airgram } from '../index';

const withLink = async (
  message: PreparedTextMessage | PreparedPhotoMessage,
): Promise<PreparedTextMessage | PreparedPhotoMessage> => {
  const link = await airgram.api.getMessageLink({
    chatId: message.chatId,
    messageId: message.messageId,
  });

  if (link.response._ === 'httpUrl') {
    message.link = link.response.url;
  }

  return message;
};

export default withLink;
