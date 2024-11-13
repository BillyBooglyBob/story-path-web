import { useMutation } from "@tanstack/react-query";
import { Project } from "../../lib/types";
import { createProject } from "../../lib/api";
import { useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm";

export default function CreateProjectForm() {
  const navigate = useNavigate();

  // Mutation method for creating a project
  const mutation = useMutation({
    mutationFn: (newProject: Project) => createProject(newProject),
    onSuccess: () => {
      console.log("Project created");
      navigate(`/project`);
    },
    onError: (error) => {
      console.log("Error creating project", error);
    },
  });

  return <ProjectForm mutation={mutation}></ProjectForm>;
}
