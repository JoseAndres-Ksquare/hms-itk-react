import { useForm } from "react-hook-form";
import { NavHome } from "../Home/NavHome";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "../firebaseconfig";
import { initializeApp } from "firebase/app";
import { useAppDispatch } from "../../App/hooks";
import { loginSuccess } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";




type Signin = {
  email: string;
  password: string;
};


export const LogIn = () => {


  const { register, handleSubmit } = useForm<Signin>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [errorM, setErrorM] = useState("");

  const firebaseLogin = async () => {
    const firebaseApp = initializeApp(firebaseConfig);
    const auth = getAuth(firebaseApp);
    const email: any = document.getElementById("email");
    const password: any = document.getElementById("password");
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );
      const token = await user.user.getIdToken();
      const uid = user.user.uid;
      const role = user.user.getIdTokenResult()
      let userRole: string = String((await role).claims.role);

      dispatch(
        loginSuccess({
          access_token: token,
          uid: uid,
          email: String(user.user.email),
          role: userRole
        })
      );



      auth.onAuthStateChanged(function (user) {
        if (user) {
          localStorage.setItem("Token", JSON.stringify(token));
          localStorage.getItem("Token");
          console.log("User sign in", user);
        } else {
          auth.signOut();
          console.log("User sign out");
        }
      });


      if (userRole === "Patient") {
        navigate("/patients");
      } else if (userRole === "Doctor") {
        navigate("/doctors");
      } else if (userRole === "Admin") {
        navigate("/admin");
      }



    } catch (errors) {
      setErrorM("Wrong Email or Password")
      console.log(errors);

    }
  };
  return (
    <>
      <div className="home-container">
        <NavHome />
        <div className="signin-container">
          <form className="Signin-form" onSubmit={handleSubmit(firebaseLogin)}>
            <p className="title">Sign In</p>
            <span id="errorMesagge" style={{ color: "red", textAlign: "center" }}>{errorM}</span>
            <label>
              Email:
              <input id="email" type={"email"} {...register("email")} required={true} />

            </label>
            <label>
              Password:
              <input id="password" type={"password"} {...register("password")} required={true} />
            </label>

            <input className="submit" type={"submit"} value="Sign In!" />
          </form>
        </div>
      </div>
    </>
  );
};
