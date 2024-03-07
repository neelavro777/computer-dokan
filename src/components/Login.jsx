import React, { useState } from "react";
import axios from "axios";
import "../globals.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      console.log(response.data);
    } catch (error) {
      console.error("Login failed:", error);
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
