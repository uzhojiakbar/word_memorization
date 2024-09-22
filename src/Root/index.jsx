import React from "react";
import "./index.css";
import { Container } from "./style";
import { Route, Router, Routes } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Login from "../pages/Login";
import Register from "../pages/Register";

const Root = () => {
  return (
    <Container>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Container>
  );
};

export default Root;
