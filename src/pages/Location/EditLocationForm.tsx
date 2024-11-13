import { ProjectLocation } from "../../lib/types";
import { getLocation, updateLocation } from "../../lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import LocationForm from "./LocationForm";

export default function EditLocationForm() {
  const { projectId, locationId } = useParams();
  const navigate = useNavigate();

  // Retrieve data for the current location using id
  const { status, error, data } = useQuery<ProjectLocation[]>({
    queryKey: ["location", locationId],
    queryFn: () => getLocation(Number(locationId)),
  });

  // Extract location from the data array
  const location = data?.[0];

  // Mutation method for updating the location
  const mutation = useMutation({
    mutationFn: (newLocation: ProjectLocation) =>
      updateLocation(Number(locationId), newLocation),
    onSuccess: () => {
      console.log("Location created");
      navigate(`/project/${projectId}/location`);
    },
    onError: (error) => {
      console.log("Error creating location", error);
    },
  });

  if (status === "pending") return <h1 className="text-white">Loading...</h1>;
  if (status === "error")
    return <h1 className="text-white">Error: {error.message}</h1>;

  return <LocationForm initialData={location} mutation={mutation} />;
}
