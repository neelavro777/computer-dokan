import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div>
      HomePage
      <div className="d-flex justify-content-end px-3">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleLoginClick}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default HomePage;
