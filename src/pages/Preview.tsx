import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getLocations, getProject } from "../lib/api";
import { Project, ProjectLocation } from "../lib/types";
import { HOMESCREEN_DISPLAY_OPTIONS, SCORING_OPTIONS } from "../lib/constants";
import { useEffect, useState } from "react";
import PreviewDescriptionItem from "../components/PreviewDisplay/PreviewDescriptionItem";
import PreviewDisplayContent from "../components/PreviewDisplay/PreviewDisplayContent";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import PreviewMapRefocus from "../components/PreviewDisplay/PreviewMapRefocus";
import { locationCoordinateDecimalTrimming } from "../lib/util";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

type Stats = {
  score: number;
  maxScore: number;
  locationsVisited: number;
  maxLocationsVisited: number;
  currentLocation?: ProjectLocation;
  visitedLocations: number[];
  scoringOn: boolean;
  location: [number, number];
};

export default function Preview() {
  const { projectId } = useParams<{ projectId: string }>();
  const [stats, setStats] = useState<Stats>({
    score: 0,
    maxScore: 0,
    locationsVisited: 0,
    maxLocationsVisited: 0,
    visitedLocations: [], // Append location id to this array when visited
    scoringOn: false,
    location: [0, 0],
  });

  // Get the project details
  const {
    status: projectStatus,
    error: projectError,
    data: projectData,
  } = useQuery<Project[]>({
    queryKey: ["project", projectId],
    queryFn: () => getProject(Number(projectId)),
  });

  // Extract project from the data array
  const project = projectData?.[0];

  // Get all locations for the current project
  const {
    status: locationStatus,
    error: locationError,
    data: locationData,
  } = useQuery<ProjectLocation[]>({
    queryKey: ["locations", projectId],
    queryFn: () => getLocations(Number(projectId)),
  });

  // Sort the location data by the order
  const locations = locationData?.sort(
    (a, b) => (a.location_order ?? 0) - (b.location_order ?? 0)
  );

  // Initialise stats based on the project and location data
  const maxScore = locations?.reduce(
    (acc, location) => acc + location.score_points,
    0
  );

  useEffect(() => {
    if (project && locations) {
      setStats((prevStats) => ({
        ...prevStats,
        score:
          project.participant_scoring === SCORING_OPTIONS.notScored ? 0 : 0,
        maxScore:
          project.participant_scoring === SCORING_OPTIONS.notScored
            ? 0
            : maxScore ?? 0,
        locationsVisited: 0,
        maxLocationsVisited: locations.length,
        visitedLocations: [],
        scoringOn: !(project.participant_scoring === SCORING_OPTIONS.notScored),
      }));
    }

    setStats((prevStats) => ({
      ...prevStats,
      location: prevStats.currentLocation
        ? (prevStats.currentLocation.location_position
            .replace(/[()]/g, "")
            .split(",")
            .map(Number) as [number, number])
        : [0, 0],
    }));
  }, [project, locations]);

  // Handle display changes when the user selects a location
  const handleLocationChange = (locationId: number) => {
    // Change the current location
    const location = locations?.find((loc) => loc.id === locationId);
    setStats((prevStats) => ({
      ...prevStats,
      currentLocation: location,
    }));

    setStats((prevStats) => ({
      ...prevStats,
      location: location
        ? (location.location_position
            .replace(/[()]/g, "")
            .split(",")
            .map(Number) as [number, number])
        : [0, 0],
    }));

    // If location not visited, update the stats
    const locationIsVisited = stats.visitedLocations.includes(locationId);

    if (!locationIsVisited) {
      setStats((prevStats) => ({
        ...prevStats,
        locationsVisited: prevStats.locationsVisited + 1,
        visitedLocations: [...prevStats.visitedLocations, locationId],
      }));
    }

    // Update the score if scoring is on
    if (stats.scoringOn) {
      setStats((prevStats) => ({
        ...prevStats,
        score:
          prevStats.score +
          (locationIsVisited ? 0 : location?.score_points ?? 0),
      }));
    }
  };

  // Handle error and loading
  if (projectStatus === "pending" || locationStatus === "pending")
    return <h1 className="text-white">Loading...</h1>;
  if (projectStatus === "error")
    return <h1 className="text-white">Error: {projectError.message}</h1>;
  if (locationStatus === "error")
    return <h1 className="text-white">Error: {locationError.message}</h1>;

  return (
    <div className="flex flex-col gap-10">
      <div className="text-white flex justify-between">
        <div className="flex-1 flex">
          <div className="flex-2/3 flex flex-col">
            <PreviewDescriptionItem
              title="Title"
              value={project?.title ?? ""}
            />
            <PreviewDescriptionItem
              title="Description"
              value={project?.description ?? ""}
            />
            <PreviewDescriptionItem
              title="Instructions"
              value={project?.instructions ?? ""}
            />
            {/* Display locations differently */}
            {project?.homescreen_display ===
            HOMESCREEN_DISPLAY_OPTIONS.initialClue ? (
              <div>
                <PreviewDescriptionItem
                  title="Initial clue"
                  value={project.initial_clue ?? ""}
                />
                <div>
                  <label htmlFor="selectLocation">Choose location</label>
                  <div className="relative">
                    <select
                      id="selectLocation"
                      name="selectLocation"
                      className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded-md appearance-none focus:outline-none"
                      onChange={(e) => {
                        const selectedLocationId = Number(e.target.value);
                        if (!isNaN(selectedLocationId)) {
                          handleLocationChange(selectedLocationId);
                        }
                      }}
                    >
                      <option value="" disabled selected>
                        Select a location
                      </option>
                      {locations?.map((location) => (
                        <option key={location.id} value={location.id}>
                          {location.location_name}
                        </option>
                      ))}
                    </select>
                    <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                      ▼
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <PreviewDescriptionItem title="Locations" />
                <div className="flex flex-col w-full p-2 bg-gray-700 border border-gray-600 rounded-md">
                  {locations?.map((location) => (
                    <button
                      key={location.id}
                      onClick={() =>
                        location.id !== undefined &&
                        handleLocationChange(location.id)
                      }
                      className="text-left p-2 border-b border-white last:border-none duration-150 hover:bg-yellow-500 hover:text-black"
                    >
                      {location.location_name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex-1/3 ">
            <PreviewDescriptionItem
              title="Scoring"
              value={`${stats.score}/${stats.maxScore}`}
            />
            <PreviewDescriptionItem
              title="Locations visited"
              value={`${stats.locationsVisited}/
              ${stats.maxLocationsVisited}`}
            />
          </div>
        </div>
        <div className="flex-1 h-full">
          <PreviewDescriptionItem
            title="Name"
            value={stats.currentLocation?.location_name ?? ""}
          />
          <PreviewDescriptionItem
            title="Position"
            value={locationCoordinateDecimalTrimming(
              stats.currentLocation?.location_position ?? ""
            )}
          />
          <PreviewDescriptionItem title="Content" />
          <PreviewDisplayContent
            htmlContent={stats.currentLocation?.location_content ?? ""}
          />
          <PreviewDescriptionItem
            title="Clue"
            value={stats.currentLocation?.clue ?? ""}
          />
          <PreviewDescriptionItem
            title="Extra"
            value={stats.currentLocation?.extra ?? ""}
          />
        </div>
      </div>
      <div>
        <MapContainer center={stats.location} zoom={13}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={stats.location} />
          <PreviewMapRefocus location={stats.location} />
        </MapContainer>
      </div>
    </div>
  );
}
