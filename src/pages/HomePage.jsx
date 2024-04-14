import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Listing from "../components/Listing";
import { useAuthContext } from "../context/AuthContext"; // adjust the path according to your project structure
import Navbar from "../components/Navbar";

const HomePage = () => {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useAuthContext();
  
  const handleLoginClick = () => {
    navigate("/login");
  };
  
  const handleAdminClick = () => {
    navigate("/admin");
  };

  const handleSellerClick = () => {
    navigate("/seller");
  };

  const handleLogout = () => {
    localStorage.removeItem("userinfo");
    setAuthUser(null);
  };

  return (
    <div><Navbar />
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <h1>HomePage</h1>
        {authUser ? (
          <div>
            <Link to="/chat" className="btn btn-primary mr-2">
              Chat
            </Link>
            {authUser.userType === 'admin' && (
              <button
                type="button"
                className="btn btn-primary mr-2"
                onClick={handleAdminClick}
              >
                Admin
              </button>
            )}
            {authUser.userType === 'seller' && (
              <button
                type="button"
                className="btn btn-primary mr-2"
                onClick={handleSellerClick}
              >
                Seller
              </button>
            )}
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleLoginClick}
          >
            Login
          </button>
        )}
      </div>
      {authUser ? (
        <h2>Welcome, {authUser.userName}</h2>
      ) : (
        <h2>You are not logged in</h2>
      )}
      <Listing />
    </div></div>
  );
};

export default HomePage;