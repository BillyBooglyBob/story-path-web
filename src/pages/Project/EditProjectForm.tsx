import { Project } from "../../lib/types";
import { getProject, updateProject } from "../../lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import ProjectForm from "./ProjectForm";

export default function AddProjectForm() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  // Retrieve data for the current project using id
  const { status, error, data } = useQuery<Project[]>({
    queryKey: ["project"],
    queryFn: () => getProject(Number(projectId)),
  });

  // Extract project form the data array
  const project = data?.[0];

  // Mutation method for updating the project
  const mutation = useMutation({
    mutationFn: (newProject: Project) => updateProject(Number(projectId), newProject),
    onSuccess: () => {
      console.log("Project created");
      navigate(`/project`);
    },
    onError: (error) => {
      console.log("Error creating project", error);
    },
  });

  if (status === "pending") return <h1 className="text-white">Loading...</h1>;
  if (status === "error")
    return <h1 className="text-white">Error: {error.message}</h1>;

  return <ProjectForm initialData={project} mutation={mutation} />;
}
