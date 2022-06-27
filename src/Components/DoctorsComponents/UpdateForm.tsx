
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { listDoctorAppointments, selectAppointmentsDetails, updateAppointment } from "../slices/appointmentSlice";





export const UpdateDoctorForm = () => {
    const { register, handleSubmit } = useForm();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const updateForm = async (values: any) => {
        try {
            dispatch(updateAppointment(values));
            dispatch(listDoctorAppointments())
            navigate("/doctors/appointments");
        } catch (error) {
            console.log(error);
        }
    };

    const appointmentInfo = useAppSelector(selectAppointmentsDetails)

    return (
        <>

            <div className="signin-container">
                <form className="Signup-form" onSubmit={handleSubmit(updateForm)}>
                    <p className="title">Update Appointment</p>

                    <label>
                        Appointment id: {appointmentInfo?.id}


                    </label>

                    <label>
                        Appointment date:
                        <input type={"date"} {...register("appointment_date")} required={true} />
                    </label>
                    <label>
                        Appointment hour:

                        <input type={"time"} {...register("appointment_hour")} required={true} />
                    </label>

                    <input className="submit" type={"submit"} value="Actualizar" />
                </form>
            </div>
        </>
    );
};

export default UpdateDoctorForm;
