import { configureStore } from "@reduxjs/toolkit";
import { stockApi } from "../api-services/stockApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice from "../reducers/authReducer";
import { categoryApi } from "../api-services/categoryApi";
import { subCategoryApi } from "../api-services/subCategoryApi";
import { branchApi } from "../api-services/branchApi";
import { locationApi } from "../api-services/locationApi";
import { shopApi } from "../api-services/shopApi";
import { divisionApi } from "../api-services/divisionApi";
import { townshipApi } from "../api-services/townshipApi";
import { supplierApi } from "../api-services/supplierApi";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [stockApi.reducerPath]: stockApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [subCategoryApi.reducerPath]: subCategoryApi.reducer,
    [branchApi.reducerPath]: branchApi.reducer,
    [locationApi.reducerPath]: locationApi.reducer,
    [shopApi.reducerPath]: shopApi.reducer,
    [divisionApi.reducerPath]: divisionApi.reducer,
    [townshipApi.reducerPath]: townshipApi.reducer,
    [supplierApi.reducerPath]: supplierApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      stockApi.middleware,
      categoryApi.middleware,
      subCategoryApi.middleware,
      branchApi.middleware,
      locationApi.middleware,
      shopApi.middleware,
      divisionApi.middleware,
      townshipApi.middleware,
      supplierApi.middleware
    ),
});

setupListeners(store.dispatch);

export default store;
