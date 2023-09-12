import React from "react";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="navbar bg-dark border-bottom border-body ">
      <div className="container-fluid ">
        <div className="col-12  ">
          <ul className="navbar-nav row justify-content-center">
            <NavLink
              className={({ isActive }) => `nav-item ${isActive && "active"}`}
              to={"/inicio"}
            >
              Inicio
            </NavLink>
            <NavLink
              className={({ isActive }) => `nav-item ${isActive && "active"}`}
              to={"/vacantes"}
            >
              Vacantes
            </NavLink>
            <NavLink
              className={({ isActive }) => `nav-item ${isActive && "active"}`}
              to={"/admin"}
            >
              Admin
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};
