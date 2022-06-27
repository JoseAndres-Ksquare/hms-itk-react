
import { NavHome } from "./NavHome";
import homeImg from "../../images/landing-1.png"
import "./navhome.css"
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { logoutSuccess } from "../slices/authSlice";
import { resetState } from "../slices/appointmentSlice";
import { resetStateDoctors } from "../slices/doctorSlice";
import { resetStatePatients } from "../slices/patientSlice";
import { resetStateProfiles } from "../slices/profileSlice";
import { resetStateUserDoctors } from "../slices/signUpDoctorSlice";
import { resetStateUserSignUp } from "../slices/signUpSlice";



export const Home = () => {
  const dispatch = useAppDispatch();
  const isLogOut = useAppSelector(logoutSuccess)
  useEffect(() => {
    if (isLogOut) {
      dispatch(resetState());
      dispatch(resetStateDoctors());
      dispatch(resetStatePatients());
      dispatch(resetStateProfiles());
      dispatch(resetStateUserDoctors());
      dispatch(resetStateUserSignUp());
    }
  }, [dispatch]);


  return (
    <>
      <div className="home-container">
        <NavHome />


        <div className="img-container" >

          <img className="img-landing" src={homeImg} alt="landing" />
          <div className="text-container">
            <h1> The Royal Hospital </h1>
            <p> Reiciendis, accusamus! Commodi quo odit magni quisquam et sint, cupiditate perspiciatis ad aliquid repudiandae harum ex recusandae, blanditiis distinctio est nihil aperiam.
            </p>
          </div>
        </div>
        <br />
        <br />

        <hr />
        <br />
        <footer className="bottom-container">
          <div className="bottom-item"><h1>About</h1><h4>Lorem ipsum dolor sit amet consectetur adipisicing elit, consectetur adipisicing elitconsectetur adipisicing elit.</h4></div>
          <div className="bottom-item"><h1>Contact</h1><h4>Lorem ipsum dolor sit amet consectetur adipisicing elit, consectetur adipisicing elitconsectetur adipisicing elit.</h4></div>
          <div className="bottom-item"><h1>Location</h1><h4>Lorem ipsum dolor sit amet consectetur adipisicing elit, consectetur adipisicing elitconsectetur adipisicing elit.</h4></div>
        </footer>

      </div>
      {window.onload}
    </>
  );
};
