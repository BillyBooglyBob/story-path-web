// Given coordinate of the form "(1244, 134)"
// Restrict the deciamls for each num to be at most 6
export const locationCoordinateDecimalTrimming = (coordinate: String): String => {
  if (coordinate == "" || coordinate == null || coordinate == undefined)
    return "";

  const coords = coordinate.split(",");

  const truncatedCoords = coords
    .map((coord) => {
      const coordArray = coord.split(".");

      // If coord is a whole number with no decimal places, return immdiately
      if (coordArray.length == 1) return coordArray;

      // Else, trim the decimal places to 6
      return coordArray[0] + "." + coordArray[1].slice(0, 6);
    })
    .join(", ");

  // Add ")" conditionally as some coords will already have ")"
  // e.g. (123, 123) will already have ) after truncating
  // e.g. (1.22, 1.33333345) will not have ) since the decimals is longer than
  // 6 decimal points
  return truncatedCoords + (truncatedCoords.slice(-1) == ")" ? "" : ")");
};

// Given coordinate in the form "(1234, 1343)"
// Split it into an array of two numbers, e.g. [1234, 1243]
export const coordinateToNumArray = (coordinate: String): [number, number] => {
  const coords = coordinate.split(",");

  // Get rid of "("
  const lat = Number(coords[0].slice(1));

  // Get rid of ")"
  const log = Number(coords[1].slice(0, -1));

  return [lat, log];
};
