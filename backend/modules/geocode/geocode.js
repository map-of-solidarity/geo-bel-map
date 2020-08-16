import { geocode } from '@esri/arcgis-rest-geocoding';
const fetch = require('node-fetch');
const { setDefaultRequestOptions, request } = require('@esri/arcgis-rest-request');
setDefaultRequestOptions({
  fetch,
  portal: `https://utility.arcgis.com/usrsvcs/appservices/${process.env.ARCGIS_ID}/rest/`
});

export async function geocode(locationName) {
  const locationObject = await geocode(locationName);
  if (locationObject.candidates && locationObject.candidates.length) {
    const lonLat = {
      longitude: candidates[0].location.x,
      latitude: candidates[0].location.y,
    };
    return lonLat;
  }
  return null;
}
