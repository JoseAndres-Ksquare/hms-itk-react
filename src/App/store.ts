import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "../Components/slices/authSlice";
import signUpReducer from "../Components/slices/signUpSlice";
import signUpDoctorReducer from "../Components/slices/signUpDoctorSlice";
import appointmentReducer from "../Components/slices/appointmentSlice";
import profileReducer from "../Components/slices/profileSlice";
import patientReducer from "../Components/slices/patientSlice";
import doctorReducer from "../Components/slices/doctorSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    signUp: signUpReducer,
    signUpDoctor: signUpDoctorReducer,
    appointment: appointmentReducer,
    profile: profileReducer,
    patient: patientReducer,
    doctor: doctorReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
