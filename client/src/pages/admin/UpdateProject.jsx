import React from 'react'
import { useUpdateProjectMutation } from '../../redux/api/projectApi'
import { useParams } from "react-router";
import Project from './Project'

const UpdateProject = () => {
   const { _id } = useParams();

  const [updateProject ,{isLoading , isError}] = useUpdateProjectMutation(_id)
    return (
    <Project newProject={updateProject} isLoading={isLoading} isError={isError} text={"Updating Project"} _id={_id} />
  )
}

export default UpdateProject