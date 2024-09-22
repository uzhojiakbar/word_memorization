// src/components/Navbar.js
import React from "react";
import { Nav, NavLink } from "./style";

const Navbar = () => {
  return (
    <Nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
    </Nav>
  );
};

export default Navbar;
