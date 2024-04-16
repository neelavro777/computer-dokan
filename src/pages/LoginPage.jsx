import React, { useState } from "react";
import axios from "axios";
import "../globals.css";
import Login from "../components/Login";
import CreateAccount from "../components/CreateAccount";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      console.log(response.data.message);
    } catch (error) {
      console.error("Registration failed:", error.response.data.error);
    }
  };
  return (
    <div className="container-fluid bg-dark text-white vh-100">
      {/* Heading */}
      <div className="row bg-light border" style={{ height: "10%" }}>
        <h2 className="text-black py-3 px-2">Computer Dokan</h2>
      </div>
      {/* Login Component */}
      <div className="row" style={{ height: "90%" }}>
        <div className="bg-secondary d-flex align-items-center col-12 col-lg-6">
          <Login />
        </div>
        {/* Create Account Component */}
        <div className="bg-light d-flex align-items-center col-12 col-lg-6">
          <CreateAccount />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
