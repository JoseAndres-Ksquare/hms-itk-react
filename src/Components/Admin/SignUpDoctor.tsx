import { DoctorUser, selectDoctorStatus } from "../slices/signUpDoctorSlice";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { createDoctorUser } from "../slices/signUpDoctorSlice";
import { useState } from "react";
import { resetStateDoctors } from "../slices/doctorSlice";


type Signup = {
  email: string;
  password: string;
  role: string;
};

export const SignUpDoctor = () => {
  const { register, handleSubmit } = useForm<Signup>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const status = useAppSelector(selectDoctorStatus)
  const [ErrorM, setErrorM] = useState("")
  const [OkM, setOkM] = useState("")
  const signUpFB = async (values: Partial<DoctorUser>) => {
    dispatch(resetStateDoctors());
    dispatch(createDoctorUser(values))
    try {
      if (status !== "completed") {
        setOkM(" ")
        setErrorM("Email Already Registered")
        navigate("/admin/signUpDoctor")

      } else {
        setErrorM(" ")
        setOkM("New doctor Registered")
        setTimeout(() => {
          navigate("/admin");
        }, 2000);

      }





    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>

      <div className="signin-container">
        <form className="Signup-form" onSubmit={handleSubmit(signUpFB)}>
          <p className="title">Register new Doctor</p>
          <span style={{ color: "red", textAlign: "center" }}>{ErrorM} </span>
          <span style={{ textAlign: "center" }} >{OkM} </span>
          <label>
            Email:
            <input id="email" type={"email"} {...register("email")} required={true} />
          </label>
          <label>
            Password:
            <input id="password" type={"password"} {...register("password")} minLength={6} required={true} />
          </label>

          <input
            style={{ display: "none" }}
            {...register("role")}
            value="Doctor"
            readOnly
          />

          <input className="submit" type={"submit"} value="Register!" />
        </form>
      </div>
    </>
  );
};

export default SignUpDoctor;
