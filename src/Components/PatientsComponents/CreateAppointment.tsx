import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../App/hooks';
import { Appointment, CreatePatientAppointment } from '../slices/appointmentSlice';
import { allDoctors, selectDoctor, selectStatusDoctor } from '../slices/doctorSlice';





const CreateAppointment = () => {
    const { register, handleSubmit } = useForm();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const reqStatus = useAppSelector(selectStatusDoctor);

    useEffect(() => {
        if (reqStatus === "idle") {
            dispatch(allDoctors());
        }
    }, [reqStatus, dispatch]);

    const Appointments = async (values: Partial<Appointment>) => {
        try {
            dispatch(CreatePatientAppointment(values));

            navigate("/patients");
        } catch (error) {
            console.log(error);
        }
    };

    const fetchdoctorInfo = useAppSelector(selectDoctor);

    const doctorsList = fetchdoctorInfo.map((doctors) => {
        return (
            <option key={doctors.id} value={doctors.id}>
                {doctors.Profile.first_name} {doctors.Profile.last_name} {doctors.medical_speciality}
            </option>
        )
    })





    return (
        <>

            <div className="signin-container">
                <form className="Signup-form" onSubmit={handleSubmit(Appointments)}>
                    <p className="title">Sign Up</p>

                    <label>
                        Appointment Date:
                        <input type={"date"} {...register("appointment_date")} required={true} />
                    </label>
                    <label>
                        Appointment Hour:
                        <input type={"time"} {...register("appointment_hour")} required={true} />
                    </label>
                    <label>
                        Description:
                        <input type={"text"} {...register("description")} required={true} />
                    </label>

                    <input
                        style={{ display: "none" }}
                        {...register("status")}
                        value="In progress"
                        readOnly
                    />

                    <label>
                        Doctor:
                        <select  {...register("DoctorId")} required={true} >
                            {doctorsList}
                        </select>
                    </label>

                    <input className="submit" type={"submit"} value="Enviar" />
                </form>
            </div>
        </>
    )
}

export default CreateAppointment