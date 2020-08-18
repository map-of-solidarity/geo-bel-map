import { PreparedTextMessage } from './textMessage';
import { ISpatialReference } from '@esri/arcgis-rest-geocoding';
import { Video } from 'airgram';
import PreparedPhotoMessage from './photoMessage';
import PreparedVideoMessage from './videoMessage';

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

interface IPreparedVideoMessage extends IPreparedMessage {
  video?: Video | undefined;
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

type EventType = 'protest' | 'forces' | 'barricades' | 'medical' | 'safe';

interface IPrepareMessageType {
  (message: Message, messageType: MessageType):
    | PreparedTextMessage
    | PreparedPhotoMessage
    | PreparedVideoMessage
    | null;
}
