import { configureStore } from "@reduxjs/toolkit";
import { stockApi } from "../api-services/stockApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice from "../reducers/authReducer";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [stockApi.reducerPath]: stockApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stockApi.middleware),
});

setupListeners(store.dispatch);

export default store;
