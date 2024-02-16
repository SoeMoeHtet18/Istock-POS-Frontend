import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const supplierApi = createApi({
  reducerPath: "supplierApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
    },
  }),
  tagTypes: ["Supplier"],
  endpoints: (builder) => ({
    getAllSuppliers: builder.query({
      query: () => ({
        url: `/suppliers`,
      }),
      transformResponse: (response) => response.data,
    }),
    createSupplier: builder.mutation({
      query: (data) => ({
        url: "/suppliers/store",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useGetAllSuppliersQuery, useCreateSupplierMutation } =
  supplierApi;
