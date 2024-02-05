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
      query: () => ({
        url: "/products",
      }),
      transformResponse: (response) => response.data.data,
    }),
  }),
});

export const { useGetAllStocksQuery } = stockApi;
