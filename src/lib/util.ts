export const locationCoordinateDecimalTrimming = (coordinate: String) => {
  if (coordinate == "" || coordinate == null || coordinate == undefined)
    return "";

  const coords = coordinate.split(",");

  console.log("Coords", coords);
  const truncatedCoords = coords
    .map((coord) => {
      const coordArray = coord.split(".");

      console.log("Coord Array", coordArray);
      // For coordinates with no decimals

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
