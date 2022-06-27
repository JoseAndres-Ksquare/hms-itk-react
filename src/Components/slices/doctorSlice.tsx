import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../App/store";
import axios from "axios";
import { Profile } from "./profileSlice";

export interface Doctor {
    id: number;
    medical_speciality: string;
    professional_license: string;
    ProfileId: number;
    Profile: Profile;
}

export interface doctorState {
    doctors: Doctor[];
    status: "idle" | "loading" | "completed" | "failed";
    doctorDetails: Doctor | null;
}

const initialState: doctorState = {
    doctors: [],
    status: "idle",
    doctorDetails: null,
};

export const createDoctor = createAsyncThunk(
    "doctors/createDoctor",
    async (body: Partial<Doctor>, thunkApi) => {
        const state = thunkApi.getState() as RootState;
        const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + state.auth.access_token,
        };
        const uid = state.auth.uid
        console.log(uid, "EL uid");

        const req = await axios({
            method: "POST",
            url: `http://localhost:5000/doctor/createDoctor/${uid}`,
            data: body = {
                medical_speciality: body.medical_speciality,
                professional_license: body.professional_license,
                ProfileId: Number(state.profile.profiles[0].id),
            },
            headers,
        });


        return req.data;
    }
);



export const readDoctor = createAsyncThunk(
    "doctor/readDoctor",
    async (_, thunkApi) => {
        const state = thunkApi.getState() as RootState;
        const uid = state.auth.uid
        const id = state.profile.profiles[0].id
        const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + state.auth.access_token,
        };
        const req = await axios.get(`http://localhost:5000/doctor/doctorAndProfile/${id}/${uid}`, { headers });
        return req.data;
    }
);

export const allDoctors = createAsyncThunk(
    "doctor/allDoctor", async (_, thunkApi) => {
        const state = thunkApi.getState() as RootState;
        const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + state.auth.access_token,
        };
        const req = await axios.get(`http://localhost:5000/admin/doctorsAndProfiles`, { headers });
        return req.data;
    }
)




export const DoctorSlice = createSlice({
    name: "doctor",
    initialState,
    reducers: {
        resetStateDoctors: (state) => {
            state.doctors = [];
            state.doctorDetails = null;
            state.status = "idle"
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createDoctor.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(createDoctor.fulfilled, (state, action) => {
            state.status = "completed";
            state.doctors = action.payload;
        });
        builder.addCase(createDoctor.rejected, (state) => {
            state.status = "failed";
        });

        builder.addCase(readDoctor.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(readDoctor.fulfilled, (state, action) => {
            state.status = "completed";
            state.doctors = action.payload;
        });
        builder.addCase(readDoctor.rejected, (state) => {
            state.status = "failed";
        });
        builder.addCase(allDoctors.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(allDoctors.fulfilled, (state, action) => {
            state.status = "completed";
            state.doctors = action.payload;
        });
        builder.addCase(allDoctors.rejected, (state) => {
            state.status = "failed";
        });


    },
});

export const selectDoctor = (state: RootState) => state.doctor.doctors;
export const selectStatusDoctor = (state: RootState) => state.doctor.status;
export const selectDoctorDetails = (state: RootState) =>
    state.doctor.doctorDetails;
export const { resetStateDoctors } = DoctorSlice.actions;

export default DoctorSlice.reducer;
