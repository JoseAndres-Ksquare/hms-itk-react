import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../App/store";

export interface AuthState {
  uid: string;
  access_token: string;
  email: string;
  role: string;
}

const initialState: AuthState = {
  uid: "",
  access_token: "",
  email: "",
  role: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.access_token = action.payload.access_token;
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },

    logoutSuccess: (state) => {
      state.access_token = "";
      state.uid = "";
      state.email = "";
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export const selectUID = (state: RootState) => state.auth.uid;
export const selectAccessToken = (state: RootState) => state.auth.access_token;
export const selectEMAIL = (state: RootState) => state.auth.email;

export default authSlice.reducer;
