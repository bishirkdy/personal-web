import { createApiSlice } from "./api";
import { AUTH_URL } from "../constants";

const authApi = createApiSlice.injectEndpoints({
    endpoints : (builder) => ({
        register : builder.mutation({
            query : (data) => ({
                url : `${AUTH_URL}/register`,
                method : 'POST',
                body : data
            })
        }),
        login : builder.mutation({
            query : (data) =>({
                url : `${AUTH_URL}/login`,
                method : 'POST',
                body : data
            })
        }),
        verify:builder.mutation({
            query:(data)=>({
                url:`${AUTH_URL}/verify-user`,
                method:'POST',
                body:data
            })
        }),
        resendOTP : builder.mutation({
            query:(data)=>({
                url:`${AUTH_URL}/resend-otp`,
                method:'POST',
                body:data
            })
        }),
        getUsers : builder.query({
            query : () => ({
                url : `${AUTH_URL}/users`,
                method : 'GET'
            })
        }),
        editUser : builder.mutation({
            query : ({_id , ...data}) => ({
                url : `${AUTH_URL}/update-user/${_id}`,
                method : 'PATCH',
                body : data
            })
        }),
        deleteUser : builder.mutation({
            query : (_id) => ({
                url : `${AUTH_URL}/delete-user`,
                method : 'DELETE',
                body : {_id}
            })
        })
    })
})

export const {useRegisterMutation , useLoginMutation , useVerifyMutation , useResendOTPMutation , useGetUsersQuery , useDeleteUserMutation , useEditUserMutation} = authApi