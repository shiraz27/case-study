import { createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

export type AuthState = {
  auth: TokenState;
};

type TokenState = {
  token: string | null;
};

const initialState: TokenState = {
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      if (action.payload) {
        SecureStore.setItemAsync("token", action.payload);
      } else {
        SecureStore.deleteItemAsync("token");
      }
    },
  },
});

export const { setToken } = authSlice.actions;
export const selectToken = (state: { auth: TokenState }) => state.auth.token;

export default authSlice.reducer;
