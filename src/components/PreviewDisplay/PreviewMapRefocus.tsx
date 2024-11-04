import { useMap } from "react-leaflet";
import { useEffect } from "react";

type PreviewMapRefocusProps = {
  location: [number, number];
};

export default function PreviewMapRefocus({ location }: PreviewMapRefocusProps) {
  const map = useMap();

  useEffect(() => {
    // Set the view to the new location when location changes
    if (location) {
      map.setView(location, map.getZoom());
    }
  }, [location, map]);

  return null;
}
