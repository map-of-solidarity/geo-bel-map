import { MessageLocation, MessageType, Photo } from '../prepareMessage/types';
import FormData from 'form-data';
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

      const features = {
        geometry: { x: long, y: lat },
        attributes: { Title: type, Description: text },
      };
      const formData = new FormData();
      formData.append('features', JSON.stringify(features));
      formData.append('f', 'json');
      formData.append('key', '');
      const response = await axios.post(API_URL, formData,
        {
          // You need to use `getHeaders()` in Node.js because Axios doesn't
          // automatically set the multipart form boundary in Node.
          headers: formData.getHeaders()
        });

      console.log(`[layerPush] response:`);
      console.log(response);
    }
  } catch (error) {
    console.error(`[layerPush] error: ${error}`);
  }
};
