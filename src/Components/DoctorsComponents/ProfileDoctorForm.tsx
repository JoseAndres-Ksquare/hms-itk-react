import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../App/hooks";
import { createProfile, Profile, readProfile } from "../slices/profileSlice";


export const ProfileDoctorForm = () => {
    const { register, handleSubmit } = useForm();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const ProfilesForm = async (values: Partial<Profile>) => {
        try {
            dispatch(createProfile(values));
            setTimeout(() => dispatch(readProfile()), 1000)
            navigate("/doctors/doctorForm");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>

            <div className="signin-container">
                <form className="Signup-form" onSubmit={handleSubmit(ProfilesForm)}>
                    <p className="title">Sign Up</p>

                    <label>
                        Nombre(s):
                        <input id="first_name" type={"text"} {...register("first_name")} />
                    </label>
                    <label>
                        Apellido(s):
                        <input id="last_name" type={"text"} {...register("last_name")} />
                    </label>
                    <label>
                        Numero telefónico:
                        <input
                            id="phone_number"
                            type={"number"}
                            {...register("phone_number")}
                        />
                    </label>
                    <label>
                        Direccion:
                        <input id="address" type={"text"} {...register("address")} />
                    </label>

                    <input className="submit" type={"submit"} value="Enviar" />
                </form>
            </div>
        </>
    );
};

export default ProfileDoctorForm;
