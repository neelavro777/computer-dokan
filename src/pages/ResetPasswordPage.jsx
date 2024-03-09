import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  let { token } = useParams();
  console.log(token);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = async () => {
    try {
      console.log(password, confirmPassword);
      const response = await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        {
          password,
          token,
        }
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Registration failed:", error.response.data);
    }
  };

  return (
    <div className="container-fluid bg-dark text-white vh-100">
      <div className="row bg-light border" style={{ height: "10%" }}>
        <h2 className="text-black py-3 px-2">Computer Dokan</h2>
      </div>
      <div className="row" style={{ height: "90%" }}>
        <div className="bg-secondary d-flex align-items-center justify-content-center col-12 col-lg-6">
          <div className="container w-75 bg-light rounded rounded-3 p-5">
            <h2 className="text-black text-center">Sign Up</h2>
            <form onSubmit={handleResetPassword}>
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

              <button type="submit" className="btn btn-dark mt-3 px-4 py-2">
                Request Reset
              </button>
            </form>
          </div>
        </div>
        <div className="bg-light d-flex align-items-center col-12 col-lg-6"></div>
      </div>
    </div>
  );
};

export default ResetPassword;
