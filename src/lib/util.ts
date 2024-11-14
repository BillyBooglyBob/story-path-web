export const locationCoordinateDecimalTrimming = (coordinate: String) => {
  if (coordinate == "" || coordinate == null || coordinate == undefined)
    return "";

  const coords = coordinate.split(",");

  const truncatedCoords = coords
    .map((coord) => {
      const coordArray = coord.split(".");

      // For coordinates with no decimals
      return coordArray[0] + "." + coordArray[1].slice(0, 6);
    })
    .join(", ");

  return truncatedCoords + ")";
};
