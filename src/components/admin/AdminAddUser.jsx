import React, { useState } from "react";
import axios from "axios";

const AdminAddUser = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userType, setUserType] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      console.log(fullName, email, password, phoneNumber, userType);
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          fullName,
          email,
          password,
          phoneNumber,
          userType,
        }
      );
      setShowConfirmation(true);
      alert("User added successfully");
      console.log(response.data.message);
    } catch (error) {
      console.error("Registration failed:", error.response.data);
    }
  };
  return (
    <div className="container rounded rounded-3 p-5">
      <h2 className="text-black ">Add User</h2>
      <hr />
      <form onSubmit={handleSignUp}>
        <div className="form-group my-3">
          <label htmlFor="fullName" className="text-black py-2 ps-2">
            Full Name
          </label>
          <input
            className="form-control"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
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
        <div className="form-group my-3">
          <label htmlFor="Phone Number" className="text-black py-2 ps-2">
            Phone Number
          </label>
          <input
            className="form-control"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="userType" className="text-black py-2 ps-2">
            User Type
          </label>
          <select
            id="userType"
            className="form-control"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="">Select User Type</option>
            <option value="customer">Customer</option>
            <option value="seller">Seller</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="btn btn-dark mt-3 px-4 py-2">
          Add User
        </button>
      </form>
    </div>
  );
};

export default AdminAddUser;
