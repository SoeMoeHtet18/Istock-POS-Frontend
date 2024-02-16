import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const branchApi = createApi({
  reducerPath: "branchApi",
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
    getAllBranches: builder.query({
      query: () => ({
        url: "/branches",
      }),
      transformResponse: (response) => response.data,
    }),
    createBranch: builder.mutation({
      query: (data) => ({
        url: "/branches/store",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useGetAllBranchesQuery, useCreateBranchMutation } = branchApi;
