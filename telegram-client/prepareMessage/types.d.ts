import { PreparedTextMessage } from './textMessage';
import { ISpatialReference } from '@esri/arcgis-rest-geocoding';

interface IPreparedMessage {
  chatId: number;
  messageId: number;
  date: number;
  type: MessageType;
  text: string;
  _parseText: (message: Message) => string;
  location: MessageLocation | null;
  link: string | null;
}

interface IPreparedTextMessage extends IPreparedMessage {}

interface IPreparedPhotoMessage extends IPreparedMessage {
  photo?: Photo | undefined;
  // _downloadPhoto: (message: MessagePhoto) => Photo;
}

type MessageLocation = {
  title: string;
  long: number;
  lat: number;
  spatialReference: ISpatialReference | undefined;
};

type Photo = {
  path: string;
  id: string;
};

type MessageType = 'protest' | 'forces' | 'barricades' | 'medical' | 'safe';

type prepareMessageType = (
  message: Message,
  messageType: MessageType,
) => PreparedTextMessage | null;
