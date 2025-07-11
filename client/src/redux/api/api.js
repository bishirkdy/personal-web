import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

// const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',
});

// const delayedBaseQuery = async (args, api, extraOptions) => {
//   await delay(5000);
//   return baseQuery(args, api, extraOptions);
// };

export const createApiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ["user", "project"],
  endpoints: () => ({}),
});
