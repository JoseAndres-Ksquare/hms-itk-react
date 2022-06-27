import { selectStatusSign, User } from "../slices/signUpSlice";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { NavHome } from "../Home/NavHome";
import { createUser } from "../slices/signUpSlice";
import { useState } from "react";



type Signup = {
  email: string;
  password: string;
  role: string;
};

export const SignupForm = () => {
  const status = useAppSelector(selectStatusSign)
  const [ErrorM, setErrorM] = useState("")
  const [OkM, setOkM] = useState("")
  const { register, handleSubmit } = useForm<Signup>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();



  const signUpFB = async (values: Partial<User>) => {
    try {

      dispatch(createUser(values))
      if (status !== "completed") {
        setOkM("")
        setErrorM("Email Already Registered")

      } else {
        setErrorM("")
        setOkM("Now you are registered")
        setTimeout(() => {
          navigate("/signin");
        }, 2000);

      }


    } catch (error) {

      console.log(error);
    }

  };

  return (
    <>
      <div className="home-container">

        <NavHome />
        <div className="signin-container">
          <form className="Signup-form" onSubmit={handleSubmit(signUpFB)}>
            <p className="title">Sign Up</p>
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
              value="Patient"
              readOnly
            />

            <input className="submit" type={"submit"} value="Sign Up" />
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
