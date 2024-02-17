import { createSlice } from "@reduxjs/toolkit";

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
    },
  },
});

export const { setToken } = authSlice.actions;
export const selectToken = (state: { auth: TokenState }) => state.auth.token;

export default authSlice.reducer;
