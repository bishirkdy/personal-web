import { PROJECT_URL } from "../constants";
import { createApiSlice } from "./api";

const projectApi = createApiSlice.injectEndpoints({
    endpoints : (builder) => ({
        createProject : builder.mutation({
            query : (data) =>({
                url : `${PROJECT_URL}/create-project`,
                method : 'POST',
                body : data
            })
        })
    })
})

export const {useCreateProjectMutation} = projectApi;