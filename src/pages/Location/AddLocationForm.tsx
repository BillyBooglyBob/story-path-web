import { useMutation } from "@tanstack/react-query";
import { createLocation } from "../../lib/api";
import { useNavigate, useParams } from "react-router-dom";
import LocationForm from "./LocationForm";
import { ProjectLocation } from "../../lib/types";

export default function AddLocationForm() {
  const { projectId, locationOrder } = useParams();
  const navigate = useNavigate();

  console.log("Project ID", projectId);
  console.log("Location Order", locationOrder);

  // Mutation method for creating a project
  const createLocationFn = async (newLocation: ProjectLocation) => {
    newLocation.location_order = Number(locationOrder);
    return createLocation(newLocation);
  };

  const mutation = useMutation({
    mutationFn: createLocationFn,
    onSuccess: () => {
      console.log("Location created");
      navigate(`/project/${projectId}/location`);
    },
    onError: (error) => {
      console.log("Error creating project", error);
    },
  });

  return <LocationForm mutation={mutation}></LocationForm>;
}
