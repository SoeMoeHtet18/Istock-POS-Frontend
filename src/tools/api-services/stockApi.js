import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const stockApi = createApi({
  reducerPath: "stockApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
    },
  }),
  tagTypes: ["Stock"],
  endpoints: (builder) => ({
    getAllStocks: builder.query({
      query: ({ categoryId, subCategoryId }) => ({
        url: `/products?category=${categoryId}&subcategory=${subCategoryId}`,
      }),
      transformResponse: (response) => response.data.data,
    }),
    createStock: builder.mutation({
      query: (data) => ({
        url: "/products/store",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => response.data.data,
    }),
  }),
});

export const { useGetAllStocksQuery, useCreateStockMutation } = stockApi;
