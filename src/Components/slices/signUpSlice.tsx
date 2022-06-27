import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../App/store";
import axios from "axios";

export interface User {
  email: string;
  password: string;
  role: string;
  uid: string;
}

export interface userState {
  users: User[];
  status: "idle" | "loading" | "completed" | "failed";
  userDetails: User | null;
}

const initialState: userState = {
  users: [],
  status: "idle",
  userDetails: null,
};

export const createUser = createAsyncThunk(
  "users/createUser",
  async (body: Partial<User>) => {
    const req = await axios({
      method: "POST",
      url: "http://localhost:5000/user/",
      data: body,
    });
    return req.data;
  }
);

export const SignUpSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetStateUserSignUp: (state) => {
      state.users = [];
      state.userDetails = null;
      state.status = "idle"
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.status = "completed";
      state.users = action.payload;
    });
    builder.addCase(createUser.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const selectUser = (state: RootState) => state.signUp.users;
export const selectStatusSign = (state: RootState) => state.signUp.status;
export const selectUserDetails = (state: RootState) => state.signUp.userDetails;
export const { resetStateUserSignUp } = SignUpSlice.actions;
export default SignUpSlice.reducer;
