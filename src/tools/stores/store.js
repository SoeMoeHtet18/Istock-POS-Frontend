import { configureStore } from "@reduxjs/toolkit";
import { stockApi } from "../api-services/stockApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice from "../reducers/authReducer";
import { categoryApi } from "../api-services/categoryApi";
import { subCategoryApi } from "../api-services/subCategoryApi";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [stockApi.reducerPath]: stockApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [subCategoryApi.reducerPath]: subCategoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      stockApi.middleware,
      categoryApi.middleware,
      subCategoryApi.middleware
    ),
});

setupListeners(store.dispatch);

export default store;
