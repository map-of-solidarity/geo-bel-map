import { EventType, MessageLocation, Photo } from '../prepareMessage/types';

import { addFeatures } from '@esri/arcgis-rest-feature-layer';
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
  type: EventType;
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
          Timestamp: message.date,
        },
      },
    ],
  };
  addFeatures(requestOptions).then((response) => {
    console.log('[Feature added with next data]', requestOptions);
    console.log('[Feature added with next data]');
    console.log('[Geometry]', requestOptions.features[0].geometry);
    console.log('[Attributes]', requestOptions.features[0].attributes);
    console.log('[addFeature response]', response);
  });
};