import { AI_PROJECT_URL } from "../constants";
import { createApiSlice } from "./api";

const aiProjectApi = createApiSlice.injectEndpoints({
    endpoints: (builder) =>({
        addAiPrompt : builder.mutation({
            query: (formData) =>({
                url: `${AI_PROJECT_URL}/add-ai-project`,
                method: 'POST',
                body: formData,
            })
        }),
        deleteAiPrompt : builder.mutation({
            query: (_id) => ({
                url: `${AI_PROJECT_URL}/delete-ai-project/${_id}`,
                method: 'DELETE',
            })
        }),
        getAiProject : builder.query({
            query: () => ({
                url: `${AI_PROJECT_URL}/get-ai-project`,
                method: 'GET',
            })
        }),
        getTopSixAiProjects : builder.query({
            query: () => ({
                url: `${AI_PROJECT_URL}/get-top-six`,
                method: 'GET',
            })
        })
    })
});

export const { 
    useAddAiPromptMutation, 
    useDeleteAiPromptMutation, 
    useGetAiProjectQuery, 
    useGetTopSixAiProjectsQuery 
} = aiProjectApi;
export default aiProjectApi;