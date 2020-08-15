const parseLocation = (text: string): string | null => {
  const locationRegex = /#address [\'|\"](.*?)[\'|\"]/gm;
  const location = locationRegex.exec(text);

  if (location === null || location.length === 0) {
    return null;
  }

  return location[1];
};

export default parseLocation;
