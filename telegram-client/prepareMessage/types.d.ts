import { PreparedTextMessage } from './textMessage';

interface IPreparedMessage {
  chatId: number;
  messageId: number;
  date: number;
  type: MessageType;
  text: string;
  _parseText: (message: Message) => string;
  location: string;
}

interface IPreparedTextMessage extends IPreparedMessage {}

interface IPreparedPhotoMessage extends IPreparedMessage {
  photo?: Photo | undefined;
  // _downloadPhoto: (message: MessagePhoto) => Photo;
}

type Photo = {
  path: string;
  id: string;
};

type MessageType = 'protest' | 'forces' | 'barricades' | 'medical' | 'safe';

type prepareMessageType = (
  message: Message,
  messageType: MessageType,
) => PreparedTextMessage | null;
