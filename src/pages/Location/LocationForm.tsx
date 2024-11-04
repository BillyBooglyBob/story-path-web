import { useEffect, useState } from "react";
import { TextInput } from "../../components/FormElements/TextInput";
import { TextArea } from "../../components/FormElements/TextArea";
import { SelectInput } from "../../components/FormElements/SelectInput";
import { LOCATION_TRIGGER_OPTIONS } from "../../lib/constants";
import { UseMutationResult } from "@tanstack/react-query";
import { ProjectLocation } from "../../lib/types";
import Form from "../../components/FormElements/Form";
import { useNavigate, useParams } from "react-router-dom";
import FormButton from "../../components/FormElements/FormButton";
import TextEditor from "../../components/TextEditor/TextEditor";

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

  // Handle change to text editor
  const handleEditorChange = (content: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      location_content: content,
    }));
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
        onChange={handleChange}
      />

      <SelectInput
        label="Location_trigger"
        name="location_trigger"
        value={formData.location_trigger}
        options={[
          {
            value: LOCATION_TRIGGER_OPTIONS.locationEntry,
            label: LOCATION_TRIGGER_OPTIONS.locationEntry,
          },
          {
            value: LOCATION_TRIGGER_OPTIONS.QRCode,
            label: LOCATION_TRIGGER_OPTIONS.QRCode,
          },
          {
            value: LOCATION_TRIGGER_OPTIONS.LocationEntryAndQRCode,
            label: LOCATION_TRIGGER_OPTIONS.LocationEntryAndQRCode,
          },
        ]}
        onChange={handleChange}
      />
      <TextArea
        label="Clue"
        name="clue"
        value={formData.clue ? formData.clue : ""}
        onChange={handleChange}
      />

      <TextInput
        type="number"
        label="Score Points"
        name="score_points"
        value={String(formData.score_points)}
        onChange={handleChange}
      />

      <TextInput
        label="Location Position"
        name="location_position"
        value={formData.location_position}
        onChange={handleChange}
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
