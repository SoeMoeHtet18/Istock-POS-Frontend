import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const townshipApi = createApi({
  reducerPath: "townshipApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_URL,
  }),
  endpoints: (builder) => ({
    getAllTownships: builder.query({
      query: () => ({
        url: "/townships",
      }),
      transformResponse: (response) => response.data,
    }),
    createTownship: builder.mutation({
      query: (data) => ({
        url: "/townships/store",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useGetAllTownshipsQuery, useCreateTownshipMutation } =
  townshipApi;
