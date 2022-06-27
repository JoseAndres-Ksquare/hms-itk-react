
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { selectPatient } from "../slices/patientSlice";
import {
  readProfile,
  selectStatusProfile,
} from "../slices/profileSlice";
import "./navbar.css";

export const PatientProfile = () => {
  const dispatch = useAppDispatch();
  const reqStatus = useAppSelector(selectStatusProfile);

  useEffect(() => {
    if (reqStatus === "idle") {
      dispatch(readProfile());
    }
  }, [reqStatus, dispatch]);

  const fetchpatientInfo = useAppSelector(selectPatient);


  const patientInfo = fetchpatientInfo.map((patient) => {


    return (
      <div key={patient.id} >
        <div className="profile-items">
          <div>Patient Id:</div> <div className="info-profile-item">{patient.id}</div>
        </div>
        <br />
        <div className="profile-items">
          <div>First name:</div> <div className="info-profile-item">{patient.Profile.first_name}</div>
        </div>
        <br />
        <div className="profile-items">
          <div>Last name:</div> <div className="info-profile-item">{patient.Profile.last_name}</div>
        </div>
        <br />
        <div className="profile-items">
          <div>Birth date:</div> <div className="info-profile-item">{patient.birth_date.split('').slice(0, 10).join('')}</div>
        </div>
        <br />
        <div className="profile-items">
          <div>Gender:</div> <div className="info-profile-item">{patient.gender}</div>
        </div>
      </div>)
  })

  return (
    <>
      <h1 className="Title"> Your Profile</h1>
      <hr />
      <div className="table-container">
        <div className="profile-container">

          {patientInfo}
        </div>
      </div>
    </>

  );
};

export default PatientProfile;
