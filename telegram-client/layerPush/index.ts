import { MessageLocation, MessageType, Photo } from '../prepareMessage/types';

const axios = require('axios').default;
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
}

export const layerPush = async (readyMessage: IReadyMessage) => {
  console.log(`[layerPush] prepared message received for webMap layer push`);

  try {
    const { date, text, location, photo, type } = readyMessage;

    if (location) {
      const { long, lat } = location;

      const feature = {
        geometry: { x: long, y: lat },
        attributes: { Title: type, Description: text },
      };

      const response = await axios.post(API_URL, {
        features: feature,
        f: 'json',
      });

      console.log(`[layerPush] response:`);
      console.log(response);
    }
  } catch (error) {
    console.error(`[layerPush] error: ${error}`);
  }
};
