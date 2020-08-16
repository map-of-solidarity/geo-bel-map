import { MessageLocation, MessageType, Photo } from '../prepareMessage/types';

const axios = require('axios').default;
const API_URL =
  'https://services5.arcgis.com/XV4SHAr4F9IApZBE/arcgis/rest/services/Crowdsourced2/FeatureServer/0/addFeatures';
const mockedFeature = [
  {
    geometry: { x: -118.15, y: 33.8 },
    attributes: {
      OWNER: 'Joe Smith',
      VALUE: 94820.37,
      APPROVED: true,
      LASTUPDATE: 1227663551096,
    },
  },
];

interface IReadyMessage {
  chatId: number;
  messageId: number;
  date: number;
  type: MessageType;
  text: string;
  location: MessageLocation | null;
  photo?: Photo;
}

export const layerPush = async (readyMessage: IReadyMessage) => {
  console.log(`[layerPush] prepared message received for webMap layer push`);

  try {
    const { date, text, location, photo } = readyMessage;

    if (location) {
      const { long, lat } = location;

      const feature = {
        geometry: { x: long, y: lat },
        attributes: { status: 'alive' },
      };

      const response = await axios.post(API_URL, {
        features: [feature],
      });

      console.log(`[layerPush] response:`);
      console.log(response);
    }
  } catch (error) {
    console.error(`[layerPush] error: ${error}`);
  }
};
