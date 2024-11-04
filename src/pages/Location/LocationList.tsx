import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteLocation,
  getLocations,
  getProject,
  updateLocation,
} from "../../lib/utils";
import { Project, ProjectLocation } from "../../lib/types";
import { useNavigate, useParams } from "react-router-dom";
import AddItemButton from "../../components/ItemList/AddItemButton";
import ListHeader from "../../components/ItemList/ListHeader";
import ListItem from "../../components/ItemList/ListItem";
import ListItemTitle from "../../components/ItemList/ListItemTitle";
import ListItemSection from "../../components/ItemList/ListItemSection";
import ListItemSectionInfo from "../../components/ItemList/ListItemSectionInfo";
import ListItemButton from "../../components/ItemList/ListItemButton";
import ListItemButtonContainer from "../../components/ItemList/ListItemButtonContainer";
import MoveItemUpButton from "../../components/ItemList/MoveItemUpButton";
import MoveItemDownButton from "../../components/ItemList/MoveItemDownButton";
import PreviewButton from "../../components/Buttons/PreviewButton/PreviewButton";
import QRCode from "react-qr-code";
import { useState } from "react";

export default function LocationList() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [qrCodeData, setQrCodeData] = useState<string | null>(null);

  const handlePrintQRCode = (locationId: number) => {
    const location = locationData?.find((loc) => loc.id === locationId);
    if (location) {
      setQrCodeData(`${projectId},${locationId}`);
    }
  };

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

  const sortedData = locationData?.sort(
    (a, b) => (a.location_order ?? 0) - (b.location_order ?? 0)
  );

  // Edit a location
  const handleEdit = (locationId: number) => {
    navigate(`/project/${projectId}/location/${locationId}`);
  };

  // Delete a location
  const deleteMutation = useMutation({
    mutationFn: (locationId: number) => deleteLocation(locationId),
    onMutate: async (locationId: number) => {
      await queryClient.cancelQueries({ queryKey: ["locations", projectId] });

      const previousLocations = queryClient.getQueryData<ProjectLocation[]>([
        "locations",
        projectId,
      ]);

      queryClient.setQueryData<ProjectLocation[]>(
        ["locations", projectId],
        (oldLocations) =>
          oldLocations?.filter((location) => location.id !== locationId)
      );

      return { previousLocations };
    },
    onError: (error) => {
      console.log("Error deleting location", error);
    },
  });

  const handleDelete = (locationId: number) => {
    deleteMutation.mutate(locationId);
  };

  // Add location
  const handleAddLocation = () => {
    // Order should be maximum order + 1
    const maxOrder =
      (locationData?.reduce((max, location) => {
        if (
          location.location_order !== undefined &&
          location.location_order > max
        ) {
          return location.location_order;
        }
        return max;
      }, 0) ?? 0) + 1;

    navigate(`/project/${projectId}/location/add/${maxOrder}`);
  };

  // Handle updating location's order
  const updateMutation = useMutation({
    mutationFn: ({
      locationId,
      newLocation,
    }: {
      locationId: number;
      newLocation: ProjectLocation;
    }) => updateLocation(locationId, newLocation),
    onSuccess: () => {
      console.log("Location updated");
    },
    onError: (error) => {
      console.log("Error updating location", error);
    },
  });

  // Swaps location order of the two locations
  const swapLocationOrder = (
    currentLocation: ProjectLocation,
    previousLocation: ProjectLocation
  ) => {
    const tempOrder = currentLocation.location_order;
    currentLocation.location_order = previousLocation.location_order;
    previousLocation.location_order = tempOrder;

    if (currentLocation.id !== undefined) {
      updateMutation.mutate({
        locationId: currentLocation.id,
        newLocation: currentLocation,
      });
    }

    if (previousLocation.id !== undefined) {
      updateMutation.mutate({
        locationId: previousLocation.id,
        newLocation: previousLocation,
      });
    }
  };

  // Change the order of the locations
  const handleMoveLocationUp = (locationId: number) => {
    const currentLocation = locationData?.find(
      (location) => location.id === locationId
    );
    const index = locationData?.findIndex(
      (location) => location.id === locationId
    );

    // If index is 0, cannot move location up higher
    if (index === 0) return;

    // Get previous location
    let previousLocation: ProjectLocation | undefined;
    if (index !== undefined && index > 0) {
      previousLocation = locationData?.[index - 1];
    }

    // Update the location_order of the two locations
    if (currentLocation && previousLocation) {
      swapLocationOrder(currentLocation, previousLocation);
    }
  };

  const handleMoveLocationDown = (locationId: number) => {
    const currentLocation = locationData?.find(
      (location) => location.id === locationId
    );
    const index = locationData?.findIndex(
      (location) => location.id === locationId
    );

    // if index is the last index, cannot move location down
    if (locationData && index === locationData.length - 1) return;

    // Get next location
    let nextLocation: ProjectLocation | undefined;
    if (
      locationData &&
      index !== undefined &&
      index < locationData.length - 1
    ) {
      nextLocation = locationData?.[index + 1];
    }

    // Update the location_order of the two locations
    if (currentLocation && nextLocation) {
      swapLocationOrder(currentLocation, nextLocation);
    }
  };

  // Handle preview button
  const handlePreview = () => {
    navigate(`/project/${projectId}/preview`);
  };

  // Handle error and loading
  if (locationStatus === "pending" || projectStatus === "pending")
    return <h1 className="text-white">Loading...</h1>;
  if (locationStatus === "error")
    return <h1 className="text-white">Error: {locationError.message}</h1>;
  if (projectStatus === "error")
    return <h1 className="text-white">Error: {projectError.message}</h1>;

  return (
    <div>
      <ListHeader>
      Location List: {project?.title}
      <PreviewButton handlePreview={handlePreview} />
      </ListHeader>

      <ul>
      {sortedData?.map((location) => (
        <ListItem key={location.id}>
        <ListItemTitle title={location.location_name} />

        <ListItemSection>
          <ListItemSectionInfo
          title="Location Trigger"
          value={location.location_trigger}
          />
          <ListItemSectionInfo
          title="Location Position"
          value={location.location_position}
          />
        </ListItemSection>

        <ListItemSection>
          <ListItemSectionInfo
          title="Score Points"
          value={String(location.score_points)}
          />
          <ListItemSectionInfo
          title="Clue"
          value={location.clue ? location.clue : "None"}
          />
        </ListItemSection>

        <ListItemButtonContainer>
          <ListItemButton
          hoverBg="bg-yellow-800"
          onClick={() => location.id && handlePrintQRCode(location.id)}
          >
          Print QR Code
          </ListItemButton>

          <ListItemButton
          hoverBg="bg-blue-800"
          onClick={() => location.id && handleEdit(location.id)}
          >
          Edit
          </ListItemButton>

          <ListItemButton
          hoverBg="bg-red-800"
          onClick={() => location.id && handleDelete(location.id)}
          >
          Delete
          </ListItemButton>
        </ListItemButtonContainer>
        <ListItemButtonContainer>
          <MoveItemUpButton
          handleClick={() =>
            location.id && handleMoveLocationUp(location.id)
          }
          />
          <MoveItemDownButton
          handleClick={() =>
            location.id && handleMoveLocationDown(location.id)
          }
          />
        </ListItemButtonContainer>
        </ListItem>
      ))}
      <AddItemButton handleAddItem={handleAddLocation} />
      </ul>
      {qrCodeData && (
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10"
        onClick={() => setQrCodeData(null)}
      >
        <div
        className="bg-white p-4 rounded flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
        >
        <QRCode value={qrCodeData} />
        <button
          className="text-black mt-2 w-full"
          onClick={() => setQrCodeData(null)}
        >
          Close
        </button>
        </div>
      </div>
      )}
    </div>
  );
}
