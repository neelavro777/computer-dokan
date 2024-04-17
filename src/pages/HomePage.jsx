import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Listing from "../components/Listing";
import { useAuthContext } from "../context/AuthContext"; // adjust the path according to your project structure
import Navbar from "../components/Navbar";

const HomePage = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthContext();
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h1>HomePage</h1>
        </div>
        {authUser ? (
          <h2>Welcome, {authUser.userName}</h2>
        ) : (
          <h2>You are not logged in</h2>
        )}
        <Listing />
      </div>
    </div>
  );
};

export default HomePage;
