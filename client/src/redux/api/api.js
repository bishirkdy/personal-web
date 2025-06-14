import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';
const baseQuery = fetchBaseQuery({baseUrl : BASE_URL});

export const createApiSlice = createApi({
    reducerPath: 'api',
    baseQuery,
    tagTypes : ["user"],
    endpoints : () => ({})
})