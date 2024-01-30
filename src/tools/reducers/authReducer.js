import { createSlice } from "@reduxjs/toolkit";

const userToken = localStorage.getItem("token");

const initialState = {
  isAuthenticated: !!userToken,
  token: userToken ?? null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setToken: (state, action) => {
      localStorage.setItem("token", action.payload);
      state.isAuthenticated = true;
      state.token = action.payload;
    },
    getToken: (state) => {
      if (state.token === null) {
        state.token = localStorage.getItem("token");
      }
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
