import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../App/store";
import axios from "axios";

export interface DoctorUser {
    email: string;
    password: string;
    uid: string;
    role: string;
}

export interface doctorUserState {
    doctorUsers: DoctorUser[];
    status: "idle" | "loading" | "completed" | "failed";
    doctorUserDetails: DoctorUser | null;
}

const initialState: doctorUserState = {
    doctorUsers: [],
    status: "idle",
    doctorUserDetails: null,
};

export const createDoctorUser = createAsyncThunk(
    "doctorUsers/createDoctorUser",
    async (body: Partial<DoctorUser>, thunkApi) => {
        const state = thunkApi.getState() as RootState;
        const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + state.auth.access_token,
        };
        const req = await axios({
            method: "POST",
            url: "http://localhost:5000/admin/createDoctor",
            data: body,
            headers
        });
        return req.data;
    }
);

export const SignUpDoctorSlice = createSlice({
    name: "doctorUser",
    initialState,
    reducers: {
        resetStateUserDoctors: (state) => {
            state.doctorUsers = [];
            state.doctorUserDetails = null;
            state.status = "idle"
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createDoctorUser.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(createDoctorUser.fulfilled, (state, action) => {
            state.status = "completed";
            state.doctorUsers = action.payload;
        });
        builder.addCase(createDoctorUser.rejected, (state) => {
            state.status = "failed";
        });
    },
});

export const selectDoctorUser = (state: RootState) => state.signUpDoctor.doctorUsers;
export const selectDoctorStatus = (state: RootState) => state.signUpDoctor.status;
export const selectDoctorUserDetails = (state: RootState) => state.signUpDoctor.doctorUserDetails;
export const { resetStateUserDoctors } = SignUpDoctorSlice.actions;
export default SignUpDoctorSlice.reducer;
