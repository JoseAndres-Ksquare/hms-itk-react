
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { selectDoctor } from "../slices/doctorSlice";
import {
    readProfile,
    selectStatusProfile,
} from "../slices/profileSlice";
import "./navbar.css";

export const DoctorProfile = () => {
    const dispatch = useAppDispatch();
    const reqStatus = useAppSelector(selectStatusProfile);

    useEffect(() => {
        if (reqStatus === "idle") {
            dispatch(readProfile());
        }
    }, [reqStatus, dispatch]);

    const fetchpatientInfo = useAppSelector(selectDoctor);


    const doctorInfo = fetchpatientInfo.map((doctor) => {
        return (
            <div key={doctor.id} >
                <div className="profile-items">
                    <div>Doctor Id:</div> <div className="info-profile-item">{doctor.id}</div>
                </div>
                <br />
                <div className="profile-items">
                    <div>First name:</div> <div className="info-profile-item">{doctor.Profile.first_name}</div>
                </div>
                <br />
                <div className="profile-items">
                    <div>Last name:</div> <div className="info-profile-item">{doctor.Profile.last_name}</div>
                </div>
                <br />
                <div className="profile-items">
                    <div>Medical speciality:</div> <div className="info-profile-item">{doctor.medical_speciality}</div>
                </div>
                <br />
                <div className="profile-items">
                    <div>Professional license:</div> <div className="info-profile-item">{doctor.professional_license}</div>
                </div>
            </div>)
    })

    return (
        <>
            <h1 className="Title">Your Profile</h1>
            <hr />

            <div className="table-container">
                <div className="profile-container">

                    {doctorInfo}
                </div>
            </div>
        </>

    );
};

export default DoctorProfile;
