import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../globals.css";
import { useAuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");
  const {setAuthUser} = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );
      

      //local storage
      localStorage.setItem("userinfo", JSON.stringify(response.data));
      setAuthUser(response.data);

      const { accessToken  } = response.data;
      const { userType } = response.data;
      const { userName } = response.data;
      const { userId } = response.data;

      localStorage.setItem("userName", userName);
      localStorage.setItem("userType", userType);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userId", userId,);
      
      navigate("/");
      console.log(response.data);
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response.data.message === "User not verified"){
        setVerificationMessage(
          "Email not verified. Please check your email for the verification link."
          );
      }
    }
  };

  const handleResendVerification = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/resend-verification",
        {
          email,
        }
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Resend verification failed:", error);
    }
  };

  return (
    <div className="container-fluid bg-light text-black auth-container rounded rounded-3 py-5 px-4">
      <div className="row">
        <div className="col-12">
          <h2 className="text-black text-center">Login</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <form onSubmit={handleSubmit}>
            <div className="form-group my-3">
              <label htmlFor="email" className="text-black py-2 ps-2">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="password" className="text-black py-2 ps-2">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p className="forgot-password text-right d-flex justify-content-end">
            <a href="/forgotpassword">Forget Password</a>
            </p>
            {verificationMessage && (
              <div className="alert alert-danger" role="alert">
                {verificationMessage}
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={handleResendVerification}
                >
                  Resend verification
                </button>
              </div>
            )}
            <button type="submit" className="btn btn-dark mt-3 px-4 py-2">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
