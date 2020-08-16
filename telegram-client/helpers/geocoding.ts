import { geocode } from '@esri/arcgis-rest-geocoding';
import { setDefaultRequestOptions, request } from '@esri/arcgis-rest-request';
require('cross-fetch/polyfill');
require('isomorphic-form-data');

setDefaultRequestOptions({
  fetch: fetch,
  portal: `https://utility.arcgis.com/usrsvcs/appservices/${process.env.ARCGIS_ID}/rest/`,
});

const geocodeLocation = async (locationName: string) => {
  const location = await geocode(locationName);
  if (location.candidates && location.candidates.length > 0) {
    const candidate = location.candidates[0];

    return {
      long: candidate.location.x,
      lat: candidate.location.y,
      spatialReference: candidate.location.spatialReference,
    };
  }

  return {
    long: 0,
    lat: 0,
    spatialReference: {
      wkid: 0,
      latestWkid: 0,
    },
  };
};

export default geocodeLocation;
