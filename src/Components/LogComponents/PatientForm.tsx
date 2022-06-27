import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../App/hooks";
import { createPatient, Patient } from "../slices/patientSlice";


export const PatientForm = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const Patients = async (values: Partial<Patient>) => {
    try {
      dispatch(createPatient(values));
      navigate("/patients");
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
            Birth date:
            <input id="first_name" type={"date"} {...register("birth_date")} required={true} />
          </label>
          <label>
            Age:
            <input id="last_name" type={"text"} {...register("age")} required={true} />
          </label>
          <label>
            Blood type:
            <input id="last_name" type={"text"} {...register("blood_type")} required={true} />
          </label>
          <label>
            Alergies:
            <input id="last_name" type={"text"} {...register("alergies")} required={true} />
          </label>
          <label>
            Gender:
            <input id="last_name" type={"text"} {...register("gender")} required={true} />
          </label>

          <input className="submit" type={"submit"} value="Enviar" />
        </form>
      </div>
    </>
  );
};

export default PatientForm;
