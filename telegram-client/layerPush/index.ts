import { addFeatures } from '@esri/arcgis-rest-feature-layer';
import { MessageLocation, MessageType, Photo } from '../prepareMessage/types';
import { config as loadEnv } from 'dotenv';
require('cross-fetch/polyfill');
require('isomorphic-form-data');

loadEnv();

if (!process.env.LAYER_URL) {
  throw Error('LAYER_URL is missing');
}

const API_URL = process.env.LAYER_URL;

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
  let accuracyLevel = 0;
  if (message.location && message.location.long !== 0) {
    accuracyLevel = 1;
  }

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
          isConfirmed: false,
          accuracyLevel: accuracyLevel,
        },
      },
    ],
  };
  addFeatures(requestOptions).then((response) => console.log(response));
};
