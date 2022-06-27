import React from "react";
import { NavLink } from "react-router-dom";
import "./navhome.css";

export const NavHome = () => {
  return (
    <div>
      <nav id="nav" className="nav-main" role="navigation">
        <div className="nav-left">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
        </div>
        <div className="nav-right">
          <NavLink to="/signin" className="nav-link">
            {/* mientras no tenga el login */}
            Log In
          </NavLink>

          <NavLink to="/signup" className="nav-link">
            Sign Up
          </NavLink>
        </div>
      </nav>
    </div>
  );
};
