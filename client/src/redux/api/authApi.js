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
        }),resendOTP : builder.mutation({
            query:(data)=>({
                url:`${AUTH_URL}/resend-otp`,
                method:'POST',
                body:data
            })
        })
    })
})

export const {useRegisterMutation , useLoginMutation , useVerifyMutation , useResendOTPMutation} = authApi