import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Listing from "../components/Listing";
import { useAuthContext } from "../context/AuthContext"; // adjust the path according to your project structure
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";

const HomePage = () => {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useAuthContext();

<<<<<<< Updated upstream
=======
  const handleSellerClick = () => {
    navigate("/seller");
  };

  const handleLogout = () => {
    localStorage.removeItem("userinfo");
    setAuthUser(null);
  };

  const handleCustomerClick = () => {
    navigate("/customer");
  };

>>>>>>> Stashed changes
  return (
    <div style={{ backgroundColor: "rgb(242, 242, 242)" }}>
      <Navbar />
      <div className="container mx-auto d-flex justify-content-center">
        <Carousel />
      </div>
      <div className="container">
<<<<<<< Updated upstream
        <div className="d-flex justify-content-between align-items-center"></div>

=======
        <div className="d-flex justify-content-between align-items-center">
          <h1>HomePage</h1>
        </div>
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

            {authUser.userType === 'customer' && (
              <button
                type="button"
                className="btn btn-primary mr-2"
                onClick={handleCustomerClick}
              >
                DiscussionForum
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
          <h2>You are not logged in</h2>
        )}
>>>>>>> Stashed changes
        <Listing />
      </div>
    </div>
  );
};

export default HomePage;
