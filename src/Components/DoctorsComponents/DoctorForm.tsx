import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../App/hooks";
import { createDoctor, Doctor } from "../slices/doctorSlice";




export const DoctorForm = () => {
    const { register, handleSubmit } = useForm();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const Patients = async (values: Partial<Doctor>) => {
        try {
            dispatch(createDoctor(values));
            navigate("/doctors");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>

            <div className="signin-container">
                <form className="Signup-form" onSubmit={handleSubmit(Patients)}>
                    <p className="title">Sign Up</p>

                    <label>
                        Medical Speciality:
                        <input id="first_name" type={"text"} {...register("medical_speciality")} />
                    </label>
                    <label>
                        Professional License:
                        <input id="last_name" type={"text"} {...register("professional_license")} />
                    </label>

                    <input className="submit" type={"submit"} value="Enviar" />
                </form>
            </div>
        </>
    );
};

export default DoctorForm;
