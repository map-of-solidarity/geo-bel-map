import { MessageLocation } from '../prepareMessage/types';
import geocodeLocation from './geocoding';

const parseLocation = async (text: string): Promise<MessageLocation | null> => {
  const locationRegex = /#(address|адрес|адресс|location|локация|лакацыя) [\'|\"](.*?)[\'|\"]/gm;
  const location = locationRegex.exec(text);

  if (location === null || location.length === 0) {
    return null;
  }

  const locationTitle = location[2];
  const geocode = await geocodeLocation(locationTitle);

  const locationWithCoordinates: MessageLocation = {
    title: locationTitle,
    long: geocode.long,
    lat: geocode.lat,
    spatialReference: geocode.spatialReference,
  };

  return locationWithCoordinates;
};

export default parseLocation;
