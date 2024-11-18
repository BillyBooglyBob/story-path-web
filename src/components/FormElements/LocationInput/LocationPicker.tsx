// Help user select location

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { coordinateToNumArray } from "../../../lib/util";
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';


type LocationPickerType = {
  handleClose: () => void;
  handleLocationChange: (lat: number, log: number) => void;
  currentPosition: string;
};

const LocationPicker = ({
  handleClose,
  handleLocationChange,
  currentPosition,
}: LocationPickerType) => {
  // Default position when no position selected
  const defaultPositon: [number, number] = [-27.4701442, 153.02413701];

  // Component to handle map clicks
  const LocationMarker = () => {
    useMapEvents({
      click(event) {
        handleLocationChange(event.latlng.lat, event.latlng.lng);
      },
    });
    return currentPosition ? (
      <Marker position={coordinateToNumArray(currentPosition)} />
    ) : null;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-7 rounded flex flex-col items-center w-[50rem] h-full relative">
        <button
          className="text-black absolute top-2 right-2"
          onClick={handleClose}
        >
          X
        </button>
        <MapContainer
          center={
            currentPosition
              ? coordinateToNumArray(currentPosition)
              : defaultPositon
          } // Default center
          zoom={15} // Default zoom level
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker />
        </MapContainer>
      </div>
    </div>
  );
};

export default LocationPicker;
