import { useEffect, useState } from "react";
import { TextInput } from "../../components/FormElements/TextInput";
import { TextArea } from "../../components/FormElements/TextArea";
import { SelectInput } from "../../components/FormElements/SelectInput";
import ToggleButton from "../../components/Buttons/ToggleButton/ToggleButton";
import {
  SCORING_OPTIONS,
  HOMESCREEN_DISPLAY_OPTIONS,
} from "../../lib/constants";
import { UseMutationResult } from "@tanstack/react-query";
import { Project } from "../../lib/types";
import Form from "../../components/FormElements/Form";
import { useNavigate } from "react-router-dom";
import FormButton from "../../components/FormElements/FormButton";

type ProjectFormProp = {
  initialData?: Project;
  mutation: UseMutationResult<object, Error, Project, unknown>;
};

// take two props, initial data and option to select the mutationFn
export default function ProjectForm({
  initialData,
  mutation,
}: ProjectFormProp) {
  const USERNAME: string = import.meta.env.VITE_USERNAME;
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Project>({
    title: "",
    description: "",
    instructions: "",
    initial_clue: "",
    participant_scoring: SCORING_OPTIONS.notScored,
    homescreen_display: HOMESCREEN_DISPLAY_OPTIONS.allLocations,
    is_published: false,
    username: USERNAME,
  });

  // Initialise the form data if initial data is provided
  useEffect(() => {
    if (initialData) setFormData({ ...formData, ...initialData });
  }, [initialData]);

  // Handle change to form element
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle toggle of the is_published button
  const handleToggle = () => {
    setFormData({ ...formData, is_published: !formData.is_published });
  };

  // Handle submission of the form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("form data:", formData);

    mutation.mutate(formData);
  };

  // Handle cancel of the form
  const handleCancel = () => {
    navigate("/project");
  };

  return (
    <Form handleSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold mb-6">Project</h1>

      <TextInput
        label="Title"
        name="title"
        value={formData.title}
        placeholder={"e.g. Brisbane tour"}
        onChange={handleChange}
      />
      <TextArea
        label="Description"
        name="description"
        value={formData.description}
        placeholder="e.g. A tresure hunt around Brisbane"
        onChange={handleChange}
      />
      <TextArea
        label="Instructions"
        name="instructions"
        value={formData.instructions}
        placeholder="e.g. Go around the city and scan QR codes"
        onChange={handleChange}
      />
      <TextArea
        label="Initial Clue"
        name="initial_clue"
        value={formData.initial_clue ? formData.initial_clue : ""}
        placeholder="e.g. Go to the city hall"
        onChange={handleChange}
      />
      <SelectInput
        label="Participant Scoring"
        name="participant_scoring"
        value={formData.participant_scoring}
        options={[
          {
            value: SCORING_OPTIONS.notScored,
            label: SCORING_OPTIONS.notScored,
          },
          { value: SCORING_OPTIONS.QRCodes, label: SCORING_OPTIONS.QRCodes },
          {
            value: SCORING_OPTIONS.locations,
            label: SCORING_OPTIONS.locations,
          },
        ]}
        onChange={handleChange}
      />
      <SelectInput
        label="Homescreen Display"
        name="homescreen_display"
        value={formData.homescreen_display}
        options={[
          {
            value: HOMESCREEN_DISPLAY_OPTIONS.allLocations,
            label: HOMESCREEN_DISPLAY_OPTIONS.allLocations,
          },
          {
            value: HOMESCREEN_DISPLAY_OPTIONS.initialClue,
            label: HOMESCREEN_DISPLAY_OPTIONS.initialClue,
          },
        ]}
        onChange={handleChange}
      />
      <div className="flex items-center mb-4">
        <label htmlFor="is_published" className="mr-4 text-lg">
          Published:
        </label>
        <ToggleButton
          isChecked={formData.is_published}
          handleClick={handleToggle}
        />
      </div>

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
