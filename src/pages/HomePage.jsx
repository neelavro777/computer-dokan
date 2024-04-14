import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Listing from "../components/Listing";


const HomePage = () => {
  const navigate = useNavigate();
  const [isLoggedin, setIsLogged] = useState(false);
  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState("");
  const [userId, setUserId] = useState("");

  const handleLoginClick = () => {
    navigate("/login");
  };
  
  const handleAdminClick = () => {
    navigate("/admin");
  };

  const handleSellerClick = () => {
    navigate("/seller");
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log(token);
    if (token) {
      setIsLogged(true);
      setUserId(localStorage.getItem("userId"));
      setUserName(localStorage.getItem("userName"));
      setUserType(localStorage.getItem("userType"));
    }
  }, []);


  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <h1>HomePage </h1>
        {isLoggedin ? (
          <div>
            {userType === 'admin' && (
              <button
                type="button"
                className="btn btn-primary mr-2"
                onClick={handleAdminClick}
              >
                Admin Panel 
              </button>
            )}
            {userType === 'seller' && (
              <button
                type="button"
                className="btn btn-primary mr-2"
                onClick={handleSellerClick}
              >
                Seller Panel
              </button>
            )}
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("userType");
                localStorage.removeItem("userName");
                setIsLogged(false);
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button
              type="button"
              className="btn btn-primary"
              // onClick={handleLoginClick}
            >
              Login
            </button>
          </Link>
        )}
      </div>
      {isLoggedin ? (
        <h2>Welcome, {userName} </h2>
      ) : (
        <h2>You are not logged in</h2>
      )}
      <Listing />
    </div>
  );
};

export default HomePage;