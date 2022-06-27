import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../App/hooks";
import { logoutSuccess } from "../slices/authSlice";
import "./navbar.css";

export const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const auth = getAuth();
  const handleSignOut = () => {
    auth.signOut().then(() => {
      dispatch(logoutSuccess());
      navigate("/");

    });

  };
  return (
    <nav className="nav-main">
      <div className="navbar-left">
        <button
          className="nav-link"
          onClick={() => {
            navigate("/doctors");
          }}
        >
          Home
        </button>
        <button
          className="nav-link"
          onClick={() => {
            navigate("/doctors/appointments");
          }}
        >
          Appointments
        </button>

      </div>

      <div className="navbar-right">
        <button
          className="nav-link"
          onClick={() => {
            navigate("/doctors/profile");
          }}
        >
          Profile
        </button>
        <button className="nav-link" onClick={handleSignOut}>
          Logout
        </button>
      </div>
    </nav>
  );
};
