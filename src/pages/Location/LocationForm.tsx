import { useEffect, useState } from "react";
import { TextInput } from "../../components/FormElements/TextInput";
import { TextArea } from "../../components/FormElements/TextArea";
import { UseMutationResult } from "@tanstack/react-query";
import { ProjectLocation } from "../../lib/types";
import Form from "../../components/FormElements/Form";
import { useNavigate, useParams } from "react-router-dom";
import FormButton from "../../components/FormElements/FormButton";
import TextEditor from "../../components/TextEditor/TextEditor";
import LocationInput from "../../components/FormElements/LocationInput/LocationInput";

type LocationFormProp = {
  initialData?: ProjectLocation;
  mutation: UseMutationResult<object, Error, ProjectLocation, unknown>;
};

export default function LocationForm({
  initialData,
  mutation,
}: LocationFormProp) {
  const navigate = useNavigate();
  const USERNAME: string = import.meta.env.VITE_USERNAME;
  const { projectId } = useParams();

  // Show the location map to select the coordinate
  const [showLocationMap, setShowLocationMap] = useState(false);

  const [formData, setFormData] = useState<ProjectLocation>({
    location_name: "",
    location_trigger: "Location Entry",
    location_position: "",
    score_points: 0,
    clue: "",
    location_content: "",
    username: USERNAME,
    project_id: Number(projectId),
  });

  // Initialise the form data if initial data is provided
  useEffect(() => {
    if (initialData)
      setFormData((prevFormData) => ({ ...prevFormData, ...initialData }));
  }, [initialData]);

  // Handle change to form element
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle change to location
  const handleLocationchange = (lat: number, log: number) => {
    const newLocation = `(${lat},${log})`;
    setFormData((prevFormData) => ({
      ...prevFormData,
      location_position: newLocation,
    }));
  };

  // Handle change to text editor
  const handleEditorChange = (content: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      location_content: content,
    }));
  };

  // Handle opening of the map
  const handleMapOpen = () => {
    setShowLocationMap(true);
  };

  // Handle closing of the map
  const handleMapClose = () => {
    setShowLocationMap(false);
  };

  // Handle submission of the form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  // Handle cancel of the form
  const handleCancel = () => {
    navigate(`/project/${projectId}/location`);
  };

  return (
    <Form handleSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold mb-6">Location</h1>

      <TextInput
        label="Location Name"
        name="location_name"
        value={formData.location_name}
        placeholder="e.g. Brisbane City Hall"
        onChange={handleChange}
      />

      <TextArea
        label="Clue to next location"
        name="clue"
        value={formData.clue ? formData.clue : ""}
        placeholder="e.g. the next location is close to the lake"
        onChange={handleChange}
      />

      <TextInput
        type="number"
        label="Score Points"
        name="score_points"
        placeholder="0"
        value={String(formData.score_points)}
        onChange={handleChange}
      />

      <LocationInput
        locationPosition={formData.location_position}
        handleLocationChange={handleLocationchange}
        handleMapOpen={handleMapOpen}
        handleMapClose={handleMapClose}
        showLocationMap={showLocationMap}
        handleChange={handleChange}
      />

      <TextEditor
        value={formData.location_content}
        onChange={handleEditorChange}
      />

      <div className="flex">
        <FormButton
          type="submit"
          backgroundColor="bg-blue-600"
          backgroundColorHover="bg-blue-700"
        >
          Save
        </FormButton>
        <FormButton
          onClick={handleCancel}
          backgroundColor="bg-gray-600"
          backgroundColorHover="bg-gray-700"
        >
          Cancel
        </FormButton>
      </div>

      {mutation.isError && <p>Error: {mutation.error.message}</p>}
    </Form>
  );
}
