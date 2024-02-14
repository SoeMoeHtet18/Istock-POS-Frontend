import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const locationApi = createApi({
  reducerPath: "locationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_URL,
  }),
  endpoints: (builder) => ({
    createLocation: builder.mutation({
      query: (data) => ({
        url: "/locations/store",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useCreateLocationMutation } = locationApi;
