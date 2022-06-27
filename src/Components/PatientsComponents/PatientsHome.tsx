import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { selectAccessToken } from "../slices/authSlice";
import { allDoctors } from "../slices/doctorSlice";
import { readPatient } from "../slices/patientSlice";
import { readProfile, selectProfile } from "../slices/profileSlice";
import homeImg from "../../images/landing-1.png"


export const PatientsHome = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const profile = useAppSelector(selectProfile)
  const token = useAppSelector(selectAccessToken)
  useEffect(() => {
    if (token) {

      dispatch(readProfile());
      setTimeout(() => {
        dispatch(readPatient());
      }, 1000)
      dispatch(allDoctors())
    }
  }, [token, dispatch])

  if (profile.length === 0) {
    navigate("/patients/profileForm")
  }

  return (
    <>
      <div className="home-patient-container">



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
        <br />
        <hr />
        <div className="bottom-container">
          <div className="bottom-item"><h1>About</h1><h4>Lorem ipsum dolor sit amet consectetur adipisicing elit, consectetur adipisicing elitconsectetur adipisicing elit.</h4></div>
          <div className="bottom-item"><h1>Contact</h1><h4>Lorem ipsum dolor sit amet consectetur adipisicing elit, consectetur adipisicing elitconsectetur adipisicing elit.</h4></div>
          <div className="bottom-item"><h1>Location</h1><h4>Lorem ipsum dolor sit amet consectetur adipisicing elit, consectetur adipisicing elitconsectetur adipisicing elit.</h4></div>

        </div>

      </div>

    </>
  );
};
