import { addFeatures } from '@esri/arcgis-rest-feature-layer';
import { MessageLocation, MessageType, Photo } from '../prepareMessage/types';
require('cross-fetch/polyfill');
require('isomorphic-form-data');

const API_URL =
  'https://services5.arcgis.com/XV4SHAr4F9IApZBE/arcgis/rest/services/Crowdsourced2/FeatureServer/0/addFeatures';

interface IReadyMessage {
  chatId: number;
  messageId: number;
  date: number;
  type: MessageType;
  text: string;
  location: MessageLocation | null;
  photo?: Photo;
  link: string | null;
}

export const pushToLayer = async (message: IReadyMessage) => {
  const requestOptions = {
    url: API_URL,
    features: [
      {
        geometry: {
          x: message.location?.long,
          y: message.location?.lat,
          spatialReference: message.location?.spatialReference,
        },
        attributes: {
          Title: message.type,
          Description: message.text,
          EventType: message.type,
          Address: message.location?.title,
          URL: message.link,
        },
      },
    ],
  };
  addFeatures(requestOptions).then((response) => console.log(response));
};
