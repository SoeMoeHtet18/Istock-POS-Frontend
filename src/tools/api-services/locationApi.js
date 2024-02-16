import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const locationApi = createApi({
  reducerPath: "locationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
    },
  }),
  endpoints: (builder) => ({
    getAllLocations: builder.query({
      query: () => ({
        url: "/locations",
      }),
      transformResponse: (response) => response.data,
    }),
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

export const { useGetAllLocationsQuery, useCreateLocationMutation } =
  locationApi;
