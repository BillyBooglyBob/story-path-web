import { TextInput } from "../TextInput";
import LocationPicker from "./LocationPicker";

type LocationInputType = {
  locationPosition: string;
  showLocationMap: boolean;
  handleMapClose: () => void;
  handleMapOpen: () => void;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleLocationChange: (lat: number, log: number) => void;
};

const LocationInput = ({
  locationPosition,
  showLocationMap,
  handleChange,
  handleMapOpen,
  handleMapClose,
  handleLocationChange,
}: LocationInputType) => {
  return (
    <div className="flex justify-between gap-10">
      <TextInput
        label="Location Position"
        name="location_position"
        value={locationPosition}
        placeholder="e.g. (200, 104) - Need to be in the specified format"
        onChange={handleChange}
      />
      <button
        type="button"
        className="mt-7 w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-600"
        onClick={handleMapOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="w-6 h-6"
          viewBox="0 0 24 24"
        >
          <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
        </svg>
      </button>

      {showLocationMap && (
        <LocationPicker
          handleClose={handleMapClose}
          handleLocationChange={handleLocationChange}
          currentPosition={locationPosition}
        />
      )}
    </div>
  );
};

export default LocationInput;
