import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
    },
  }),
  tagTypes: ["Shop"],
  endpoints: (builder) => ({
    getAllShops: builder.query({
      query: ({ categoryId, subCategoryId }) => ({
        url: `/shops?category=${categoryId}&subcategory=${subCategoryId}`,
      }),
      transformResponse: (response) => response.data.data,
    }),
    createShop: builder.mutation({
      query: (data) => ({
        url: "/shops/store",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => response.data.data,
    }),
  }),
});

export const { useGetAllShopsQuery, useCreateShopMutation } = shopApi;
