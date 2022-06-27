import { Route, Routes } from "react-router-dom";
import PatientForm from "../Components/LogComponents/PatientForm";
import ProfileForm from "../Components/LogComponents/ProfileForm";
import CreateAppointment from "../Components/PatientsComponents/CreateAppointment";
import { NavBar } from "../Components/PatientsComponents/NavBar";
import { PatientAppointments } from "../Components/PatientsComponents/PatientAppointments";
import { PatientAppointmentsFinished } from "../Components/PatientsComponents/PatientAppointmentsFinished";
import { PatientProfile } from "../Components/PatientsComponents/PatientProfile";
import { PatientsHome } from "../Components/PatientsComponents/PatientsHome";

const PatientsRoutes = () => {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<PatientsHome />} />
        <Route path="appointments" element={<PatientAppointments />} />
        <Route path="appointmentsFinished" element={<PatientAppointmentsFinished />} />
        <Route path="createAppointments" element={<CreateAppointment />} />
        <Route path="profile" element={<PatientProfile />} />
        <Route path="profileForm" element={<ProfileForm />} />
        <Route path="patientForm" element={<PatientForm />} />
      </Routes>
    </>
  );
};

export default PatientsRoutes;
