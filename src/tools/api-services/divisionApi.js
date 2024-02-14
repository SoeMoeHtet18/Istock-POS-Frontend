import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const divisionApi = createApi({
  reducerPath: "divisionApi",
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
    getAllDivisions: builder.query({
      query: () => ({
        url: "/divisions",
      }),
      transformResponse: (response) => response.data,
    }),
    createDivision: builder.mutation({
      query: (data) => ({
        url: "/divisions/store",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => response.data.data,
    }),
  }),
});

export const { useGetAllDivisionsQuery, useCreateDivisionMutation } =
  divisionApi;
