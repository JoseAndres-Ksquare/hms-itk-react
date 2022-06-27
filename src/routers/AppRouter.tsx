import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../Components/Home/Home";
import { LogIn } from "../Components/LogComponents/LogIn";
import { SignupForm } from "../Components/LogComponents/SignUp";
import AdminRoutes from "./AdminRoutes";
import DoctorRoutes from "./DoctorRoutes";
import PatientsRoutes from "./PatientsRoutes";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signin" element={<LogIn />} />
        <Route path="signup" element={<SignupForm />} />
        <Route path="/patients/*" element={<PatientsRoutes />} />
        <Route path="/doctors/*" element={<DoctorRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  );
};
