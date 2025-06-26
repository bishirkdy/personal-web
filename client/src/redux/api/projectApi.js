import { PROJECT_URL } from "../constants";
import { createApiSlice } from "./api";

const projectApi = createApiSlice.injectEndpoints({
    endpoints : (builder) => ({
        createProject : builder.mutation({
            query : (formData) =>({
                url : `${PROJECT_URL}/create-project`,
                method : 'POST',
                body : formData
            })
        }),
        getAllProject :builder.query({
            query : () => ({
                url : `${PROJECT_URL}/get-all-project`,
            }),
            providesTags : ["project"],
            keepUnusedDataFor : 30
        }),
        projectDetails: builder.query({
            query: (id) =>({
                url : `${PROJECT_URL}/project-details/${id}`,
            }),
            providesTags : ["project"]
        }),
        updateProject : builder.mutation({
            query : ({ _id , formData}) =>({
                url : `${PROJECT_URL}/update-project/${_id}`,
                method : 'PUT',
                body : formData
            })
        }),
        deleteProject : builder.mutation({
            query : (_id) => ({
                url : `${PROJECT_URL}/delete-project/${_id}`,
                method : 'DELETE'
            })
        }),
        getTopSixProject : builder.query({
            query : () => ({
                url : `${PROJECT_URL}/top-six-project`,
            })
        })
    })
})

export const {useCreateProjectMutation , useGetAllProjectQuery , useProjectDetailsQuery , useUpdateProjectMutation  , useDeleteProjectMutation , useGetTopSixProjectQuery } = projectApi;