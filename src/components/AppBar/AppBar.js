import React from "react";
import { NavLink } from "react-router-dom";
import "./AppBar.css";
import logo from "./AppBar.logo.svg";

const AppBar = () => (
  <nav className="AppBar">
    <NavLink to="/">
      <img
        className="AppBar-logo"
        src={logo}
        aria-label="people"
        alt="People"
      />
    </NavLink>
    <NavLink to="/">Home</NavLink>
  </nav>
);

export default AppBar;
