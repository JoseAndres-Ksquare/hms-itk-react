import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../App/store";
import axios from "axios";
import { async } from "@firebase/util";

export interface Appointment {
  id: number;
  appointment_date: string;
  appointment_hour: string;
  description: string;
  status: string;
  PatientId: number;
  DoctorId: number;
}

export interface appointmentState {
  appointments: Appointment[];
  status: "idle" | "loading" | "completed" | "failed";
  appointmentDetails: Appointment | null;
}

const initialState: appointmentState = {
  appointments: [],
  status: "idle",
  appointmentDetails: null,
};



export const listAllAppointments = createAsyncThunk(
  "admin/listAllAppointments",
  async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + state.auth.access_token,
    };
    const req = await axios.get(
      `http://localhost:5000/admin/filterAppointments`,
      { headers }
    );

    return req.data;
  }
);

export const listPatientAppointments = createAsyncThunk(
  "patientAppointments/list",
  async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const id = state.patient.patients[0].id
    const uid = state.auth.uid
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + state.auth.access_token,
    };
    const req = await axios.get(
      `http://localhost:5000/appointment/patientApointments/${id}/${uid}`,
      { headers }
    );
    return req.data;
  }
);

export const listPatientAppointmentsFinished = createAsyncThunk(
  "patientAppointmentsFinished/list",
  async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const id = state.patient.patients[0].id
    const uid = state.auth.uid
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + state.auth.access_token,
    };
    const req = await axios.get(
      `http://localhost:5000/appointment/patientApointmentsFinished/${id}/${uid}`,
      { headers }
    );
    return req.data;
  }
);

export const listDoctorAppointments = createAsyncThunk(
  "doctorAppointments/list",
  async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const id = state.doctor.doctors[0].id;
    const uid = state.auth.uid
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + state.auth.access_token,
    };
    const req = await axios.get(
      `http://localhost:5000/appointment/doctorApointment/${id}/${uid}`,
      { headers }
    );

    return req.data;
  }
);

export const getInfoAppointment = createAsyncThunk(
  "appointment/getInfo", async (body: Appointment) => {

    return body;
  })


export const CreatePatientAppointment = createAsyncThunk(
  "patient/createAppointment", async (body: Partial<Appointment>, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const id = state.patient.patients[0].id;
    const uid = state.auth.uid;
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + state.auth.access_token,
    };
    await axios({
      method: "POST",
      url: `http://localhost:5000/appointment/create/${uid}`,
      data: body = {
        appointment_date: body.appointment_date,
        appointment_hour: body.appointment_hour,
        description: body.description,
        status: body.status,
        PatientId: id,
        DoctorId: body.DoctorId
      },
      headers,
    });
  }
)

export const updateAppointment = createAsyncThunk(
  "patient/createAppointment", async (body: Partial<Appointment>, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const id = state.appointment.appointmentDetails?.id
    const uid = state.auth.uid;
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + state.auth.access_token,
    };

    await axios({
      method: "PATCH",
      url: `http://localhost:5000/appointment/updateAppointment/${id}/${uid}`,
      data: body = {
        appointment_date: body.appointment_date,
        appointment_hour: body.appointment_hour,
      },
      headers,
    });

  }

)



export const cancelAppointment = createAsyncThunk(
  "patientAppointments/cancel",
  async (key: any, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const id = key
    const uid = state.auth.uid
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + state.auth.access_token,
    };
    const req = await axios.delete(
      `http://localhost:5000/appointment/${id}/${uid}`,
      { headers }
    );
    console.log(id);

    return req.data;
  }
);


export const AppointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    resetState: (state) => {
      state.appointments = [];
      state.appointmentDetails = null;
      state.status = "idle"
    }
  },
  extraReducers: (builder) => {
    //Create Appointment
    builder.addCase(CreatePatientAppointment.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(CreatePatientAppointment.fulfilled, (state, action) => {
      state.status = "completed";

    });
    builder.addCase(CreatePatientAppointment.rejected, (state) => {
      state.status = "failed";
    });
    //Patients
    builder.addCase(listPatientAppointments.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(listPatientAppointments.fulfilled, (state, action) => {
      state.status = "completed";
      state.appointments = action.payload;
    });
    builder.addCase(listPatientAppointments.rejected, (state) => {
      state.status = "failed";
    });
    //PatientsAppFinished
    builder.addCase(listPatientAppointmentsFinished.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(listPatientAppointmentsFinished.fulfilled, (state, action) => {
      state.status = "completed";
      state.appointments = action.payload;
    });
    builder.addCase(listPatientAppointmentsFinished.rejected, (state) => {
      state.status = "failed";
    });
    //Doctors
    builder.addCase(listDoctorAppointments.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(listDoctorAppointments.fulfilled, (state, action) => {
      state.status = "completed";
      state.appointments = action.payload;
    });
    builder.addCase(listDoctorAppointments.rejected, (state) => {
      state.status = "failed";
    });
    //Admin
    builder.addCase(listAllAppointments.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(listAllAppointments.fulfilled, (state, action) => {
      state.status = "completed";
      state.appointments = action.payload;
    });
    builder.addCase(listAllAppointments.rejected, (state) => {
      state.status = "failed";
    });
    //GetInfo
    builder.addCase(getInfoAppointment.fulfilled, (state, action) => {
      state.status = "completed";
      state.appointmentDetails = action.payload;
    });
    /* 
        builder.addCase(resetState.fulfilled, (state, action) => {
          state = initialState;
        }); */



  },
});

export const selectAppointments = (state: RootState) =>
  state.appointment.appointments;
export const selectStatus = (state: RootState) => state.appointment.status;
export const selectAppointmentsDetails = (state: RootState) =>
  state.appointment.appointmentDetails;

export const { resetState } = AppointmentSlice.actions;

export default AppointmentSlice.reducer;
