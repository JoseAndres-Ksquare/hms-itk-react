import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../App/store";
import axios from "axios";

export interface Profile {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  address: string;
  user_id: string;
}

export interface profileState {
  profiles: Profile[];
  status: "idle" | "loading" | "completed" | "failed";
  profileDetails: Profile | null;
}

const initialState: profileState = {
  profiles: [],
  status: "idle",
  profileDetails: null,
};

export const createProfile = createAsyncThunk(
  "profile/createProfile",
  async (body: Partial<Profile>, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + state.auth.access_token,
    };
    const uid = state.auth.uid
    const req = await axios({
      method: "POST",
      url: `http://localhost:5000/profile/createProfile/${uid}`,
      data: body = {
        first_name: body.first_name,
        last_name: body.last_name,
        phone_number: body.phone_number,
        address: body.address,
        user_id: String(uid),
      },
      headers,
    });


    return req.data;
  }
);

export const readProfile = createAsyncThunk(
  "profiles/readProfile",
  async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const uid = state.auth.uid;
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + state.auth.access_token,
    };
    const req = await axios.get(`http://localhost:5000/profile/profiles/${uid}`, { headers })


    return req.data;
  }
);

export const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetStateProfiles: (state) => {
      state.profiles = [];
      state.profileDetails = null;
      state.status = "idle"
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createProfile.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createProfile.fulfilled, (state, action) => {
      state.status = "completed";
      state.profiles = action.payload;
    });
    builder.addCase(createProfile.rejected, (state) => {
      state.status = "failed";
    });

    builder.addCase(readProfile.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(readProfile.fulfilled, (state, action) => {
      state.status = "completed";
      state.profiles = action.payload;
    });
    builder.addCase(readProfile.rejected, (state) => {
      state.status = "failed";
    });


  },
});

export const selectProfile = (state: RootState) => state.profile.profiles;
export const selectStatusProfile = (state: RootState) => state.profile.status;
export const selectProfileDetails = (state: RootState) =>
  state.profile.profileDetails;
export const { resetStateProfiles } = ProfileSlice.actions;
export default ProfileSlice.reducer;
