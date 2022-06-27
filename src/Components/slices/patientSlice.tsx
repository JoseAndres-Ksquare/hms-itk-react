import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../App/store";
import axios from "axios";
import { Profile } from "./profileSlice";

export interface Patient {
    id: number;
    birth_date: string;
    age: string;
    blood_type: string;
    alergies: string;
    gender: string;
    ProfileId: number;
    Profile: Profile;
}

export interface patientState {
    patients: Patient[];
    status: "idle" | "loading" | "completed" | "failed";
    patientsDetails: Patient | null;
}

const initialState: patientState = {
    patients: [],
    status: "idle",
    patientsDetails: null,
};

export const createPatient = createAsyncThunk(
    "patients/createPatients",
    async (body: Partial<Patient>, thunkApi) => {
        const state = thunkApi.getState() as RootState;
        const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + state.auth.access_token,
        };
        const uid = state.auth.uid
        console.log(uid, "EL uid");

        const req = await axios({
            method: "POST",
            url: `http://localhost:5000/patient/createPatient/${uid}`,
            data: body = {
                birth_date: body.birth_date,
                age: body.age,
                blood_type: body.blood_type,
                alergies: body.alergies,
                gender: body.gender,
                ProfileId: Number(state.profile.profiles[0].id),
            },
            headers,
        });


        return req.data;
    }
);

export const readPatient = createAsyncThunk(
    "patient/readPatient",
    async (_, thunkApi) => {
        const state = thunkApi.getState() as RootState;
        const uid = state.auth.uid
        const id = state.profile.profiles[0].id
        const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + state.auth.access_token,
        };
        const req = await axios.get(`http://localhost:5000/patient/patientAndProfile/${id}/${uid}`, { headers });
        return req.data;
    }
);

export const allPatients = createAsyncThunk(
    "patient/allPatients", async (_, thunkApi) => {
        const state = thunkApi.getState() as RootState;
        const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + state.auth.access_token,
        };
        const req = await axios.get(`http://localhost:5000/admin/patientsAndProfiles`, { headers });
        return req.data;
    }
)


export const PatientSlice = createSlice({
    name: "patient",
    initialState,
    reducers: {
        resetStatePatients: (state) => {
            state.patients = [];
            state.patientsDetails = null;
            state.status = "idle"
        }
    },
    extraReducers: (builder) => {
        //Create
        builder.addCase(createPatient.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(createPatient.fulfilled, (state, action) => {
            state.status = "completed";
            state.patients = action.payload;
        });
        builder.addCase(createPatient.rejected, (state) => {
            state.status = "failed";
        });
        //Read
        builder.addCase(readPatient.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(readPatient.fulfilled, (state, action) => {
            state.status = "completed";
            state.patients = action.payload;
        });
        builder.addCase(readPatient.rejected, (state) => {
            state.status = "failed";
        });
        //All
        builder.addCase(allPatients.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(allPatients.fulfilled, (state, action) => {
            state.status = "completed";
            state.patients = action.payload;
        });
        builder.addCase(allPatients.rejected, (state) => {
            state.status = "failed";
        });

    },
});

export const selectPatient = (state: RootState) => state.patient.patients;
export const selectStatusPatient = (state: RootState) => state.patient.status;
export const selectPatientDetails = (state: RootState) =>
    state.patient.patientsDetails;
export const { resetStatePatients } = PatientSlice.actions;

export default PatientSlice.reducer;
