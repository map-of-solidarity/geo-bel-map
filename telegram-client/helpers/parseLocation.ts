import { MessageLocation } from '../prepareMessage/types';
import geocodeLocation from './geocoding';

const parseLocation = async (text: string): Promise<MessageLocation | null> => {
  const locationRegex = /#address [\'|\"](.*?)[\'|\"]/gm;
  const location = locationRegex.exec(text);

  if (location === null || location.length === 0) {
    return null;
  }

  const locationTitle = location[1];
  const geocode = await geocodeLocation(locationTitle);

  const locationWithCoordinates: MessageLocation = {
    title: locationTitle,
    long: geocode.long,
    lat: geocode.lat,
  };

  return locationWithCoordinates;
};

export default parseLocation;
