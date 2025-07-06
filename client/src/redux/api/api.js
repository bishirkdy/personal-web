import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include'
});
export const createApiSlice = createApi({
    reducerPath: 'api',
    baseQuery,
    tagTypes : ["user" , "project"],
    credentials : 'include',
    endpoints : () => ({})
})

