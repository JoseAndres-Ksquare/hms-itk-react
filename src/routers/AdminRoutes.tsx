import { Route, Routes } from "react-router-dom";
import AdminAppointments from "../Components/Admin/AdminAppointments";
import { AdminHome } from "../Components/Admin/AdminHome";
import ProfileDoctorForm from "../Components/DoctorsComponents/ProfileDoctorForm";
import { NavBar } from "../Components/Admin/NavBar";
import SignUpDoctor from "../Components/Admin/SignUpDoctor";
import AllPatients from "../Components/Admin/AllPatients";
import AllDoctors from "../Components/Admin/AllDoctors";

const AdminRoutes = () => {
    return (
        <>
            <NavBar />

            <Routes>
                <Route path="/" element={<AdminHome />} />
                <Route path="appointments" element={<AdminAppointments />} />
                <Route path="signUpDoctor" element={<SignUpDoctor />} />
                <Route path="allPatients" element={<AllPatients />} />
                <Route path="allDoctors" element={<AllDoctors />} />

            </Routes>
        </>
    );
};

export default AdminRoutes;
