import { useCreateProjectMutation } from "../../redux/api/projectApi";
import Project from "./Project";

const CreateProject = () => {
   const [createProject, { isLoading, isError }] = useCreateProjectMutation();


  return (
    <Project newProject={createProject} isLoading={isLoading} isError={isError} text={"Create New Project"} />
  )
};

export default CreateProject;
