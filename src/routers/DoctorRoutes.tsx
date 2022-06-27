
import { Route, Routes } from "react-router-dom";
import { NavBar } from "../Components/DoctorsComponents/NavBar";
import DoctorAppointments from "../Components/DoctorsComponents/DoctorAppointments";
import { DoctorsHome } from "../Components/DoctorsComponents/DoctorsHome";
import ProfileDoctorForm from "../Components/DoctorsComponents/ProfileDoctorForm";
import DoctorForm from "../Components/DoctorsComponents/DoctorForm";
import DoctorProfile from "../Components/DoctorsComponents/DoctorProfile";
import UpdateDoctorForm from "../Components/DoctorsComponents/UpdateForm";



const DoctorRoutes = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<DoctorsHome />} />
        <Route path="appointments" element={<DoctorAppointments />} />
        <Route path="profileForm" element={<ProfileDoctorForm />} />
        <Route path="doctorForm" element={<DoctorForm />} />
        <Route path="updateForm" element={<UpdateDoctorForm />} />
        <Route path="profile" element={<DoctorProfile />} />

      </Routes>
    </>
  );
};

export default DoctorRoutes;
