import PreparedTextMessage from '../prepareMessage/textMessage';
import PreparedPhotoMessage from '../prepareMessage/photoMessage';
import parseLocation from './parseLocation';

const withLocation = async (
  message: PreparedTextMessage | PreparedPhotoMessage,
): Promise<PreparedTextMessage | PreparedPhotoMessage> => {
  const location = await parseLocation(message.text);
  message.location = location;

  return message;
};

export default withLocation;
