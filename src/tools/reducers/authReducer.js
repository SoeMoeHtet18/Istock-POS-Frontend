import { createSlice } from "@reduxjs/toolkit";

const userToken = sessionStorage.getItem("token");

const initialState = {
  isAuthenticated: !!userToken,
  token: userToken ?? null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setToken: (state, action) => {
      sessionStorage.setItem("token", action.payload);
      state.isAuthenticated = true;
      state.token = action.payload;
    },
    getToken: (state) => {
      return state;
    },
    unsetToken: (state) => {
      state.isAuthenticated = false;
      state.token = null;
    },
  },
});

export const { setToken, getToken, unsetToken } = authSlice.actions;
export default authSlice.reducer;
