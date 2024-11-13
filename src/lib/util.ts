export const locationCoordinateDecimalTrimming = (coordinate: String) => {
  if (coordinate == "") return "";

  const coords = coordinate.split(",");

  const truncatedCoords = coords
    .map((coord) => {
      const coordArray = coord.split(".");

      return coordArray[0] + "." + coordArray[1].slice(0, 6);
    })
    .join(", ");

  return truncatedCoords + ")";
};
