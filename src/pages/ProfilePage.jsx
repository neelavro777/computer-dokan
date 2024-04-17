import React, { useState } from "react";
import Axios from "axios"; // Ensure Axios is installed using npm or yarn
import { useAuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const ProfilePage = () => {
  const { authUser, setAuthUser } = useAuthContext();
  console.log(authUser);
  // Local state for handling form inputs
  const [userId, setUserId] = useState(authUser.userId);
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [phoneNumber, setPhoneNumber] = useState(
    localStorage.getItem("phoneNumber")
  );

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await Axios.post(
        "http://localhost:5000/api/auth/update-user",
        {
          userId,
          userName,
          phoneNumber,
        }
      );
      localStorage.setItem("userName", userName);
      localStorage.setItem("phoneNumber", phoneNumber);
      console.log("User updated successfully");
      const previousAuthUser = authUser;
      previousAuthUser.userName = userName;
      previousAuthUser.phoneNumber = phoneNumber;
      console.log(previousAuthUser, "previousAuthUser");
      setAuthUser(previousAuthUser);
      //   setAuthUser((prev) => ({
      //     ...prev,
      //     userName: userName,
      //     phoneNumber: phoneNumber,
      //   }));
      console.log(authUser);
    } catch (error) {
      console.error("Failed to update user", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 px-4">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <p className="fs-3">User Profile</p>
            <hr className="mb-4" />
            <form onSubmit={handleUpdate}>
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="userId" className="form-label">
                    User ID:
                  </label>
                  <input
                    type="text"
                    readOnly
                    className="form-control disabled"
                    id="userId"
                    value={authUser.userId}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="userName" className="form-label">
                    User Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="text"
                    readOnly
                    className="form-control disabled"
                    id="email"
                    value={authUser.email}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="userType" className="form-label">
                    User Type:
                  </label>
                  <input
                    type="text"
                    readOnly
                    className="form-control"
                    id="userType"
                    value={authUser.userType}
                    disabled
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label">
                    Phone Number:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNumber"
                    value={phoneNumber || "N/A"}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
