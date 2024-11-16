import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProject, getProjects } from "../../lib/api";
import { Project } from "../../lib/types";
import { useNavigate } from "react-router-dom";
import AddItemButton from "../../components/ItemList/AddItemButton";
import ListHeader from "../../components/ItemList/ListHeader";
import ListItem from "../../components/ItemList/ListItem";
import ListItemTitle from "../../components/ItemList/ListItemTitle";
import ListItemSection from "../../components/ItemList/ListItemSection";
import ListItemSectionInfo from "../../components/ItemList/ListItemSectionInfo";
import ListItemButton from "../../components/ItemList/ListItemButton";
import ListItemButtonContainer from "../../components/ItemList/ListItemButtonContainer";
import LoadingList from "../../components/ItemListLoading/LoadingList";

export default function ProjectList() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Get all projects
  const { status, error, data } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  // Edit a project
  const handleEdit = (projectId: number) => {
    navigate(`/project/${projectId}`);
  };

  // Delete a project
  const deleteMutation = useMutation({
    mutationFn: (projectId: number) => deleteProject(projectId),
    onMutate: async (projectId: number) => {
      await queryClient.cancelQueries({ queryKey: ["projects"] });

      const previousProjects = queryClient.getQueryData<Project[]>([
        "projects",
      ]);

      queryClient.setQueryData<Project[]>(["projects"], (oldProjects) =>
        oldProjects?.filter((project) => project.id !== projectId)
      );

      return { previousProjects };
    },
    onError: (error) => {
      console.log("Error deleting project", error);
    },
  });

  const handleDelete = (projectId: number) => {
    deleteMutation.mutate(projectId);
  };

  // Add project
  const handleAddProject = () => {
    navigate("/project/add");
  };

  // View locations of a project
  const handleViewLocations = (projectId: number) => {
    navigate(`/project/${projectId}/location`);
  };

  // Handle error and loading
  if (status === "error")
    return <h1 className="text-white">Error: {error.message}</h1>;
  if (status === "pending")
    return (
      <div>
        <ListHeader header="Project List" />
        <LoadingList />;
      </div>
    );

  return (
    <div>
      <ListHeader header="Project List" />
      <ul>
        {data?.map((project) => (
          <ListItem key={project.id}>
            <ListItemTitle title={project.title} />

            <ListItemSection>
              <ListItemSectionInfo
                title="Scoring"
                value={project.participant_scoring}
              />
              <ListItemSectionInfo
                title="Mode"
                value={project.homescreen_display}
              />
              {project.is_published ? (
                <p className="text-green-600">Published</p>
              ) : (
                <p className="text-red-600">Not published</p>
              )}
            </ListItemSection>

            <ListItemSection>
              <ListItemSectionInfo
                title="Description"
                value={project.description}
              />
            </ListItemSection>

            <ListItemSection>
              <ListItemSectionInfo
                title="Instructions"
                value={project.instructions}
              />
              <ListItemSectionInfo
                title="Initial Clue"
                value={project.initial_clue ? project.initial_clue : "None"}
              />
            </ListItemSection>

            <ListItemButtonContainer>
              <ListItemButton
                hoverBg="bg-blue-800"
                onClick={() => project.id && handleEdit(project.id)}
              >
                Edit
              </ListItemButton>
              <ListItemButton
                hoverBg="bg-green-800"
                onClick={() => project.id && handleViewLocations(project.id)}
              >
                View Locations
              </ListItemButton>
              <ListItemButton
                hoverBg="bg-red-800"
                onClick={() => project.id && handleDelete(project.id)}
              >
                Delete
              </ListItemButton>
            </ListItemButtonContainer>
          </ListItem>
        ))}
        <AddItemButton handleAddItem={handleAddProject} />
      </ul>
    </div>
  );
}
