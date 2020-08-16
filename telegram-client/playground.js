const FormData = require('form-data');
const axios = require('axios').default;
const API_URL =
  'https://services5.arcgis.com/XV4SHAr4F9IApZBE/arcgis/rest/services/Crowdsourced2/FeatureServer/0/addFeatures';

async function main() {
  const features = {
    geometry: { x: 100, y: 100 },
    attributes: { Title: 'type', Description: 'text' },
  };
  const formData = new FormData();
  formData.append('features', JSON.stringify(features));
  formData.append('f', 'json');
  const response = await axios.post(API_URL, formData,
    {
      // You need to use `getHeaders()` in Node.js because Axios doesn't
      // automatically set the multipart form boundary in Node.
      headers: formData.getHeaders()
    });

  console.log(`[layerPush] response:`);
  console.log(response);
}

main()
