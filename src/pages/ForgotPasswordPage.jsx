import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    
    const handleLoginClick = () => {
        navigate("/login");
    };
    return (
        <div className=" container d-flex flex-column align-items-center justify-content-center text-black py-5">
        <div className="container p-5 border border-2 rounded rounded-3 w-75">
            <h2>FORGOT YOUR PASSWORD?</h2>
            <hr />
            <p className="fs-5">
            Please enter the email address you used to register. We will then send
            you a new password.
            </p>
            <hr />
            <div className="container-fluid p-0 d-flex flex-column gap-3 fs-5">
            <div>
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
            <div className="d-flex justify-content-end px-3">
                <button
                type="button"
                className="btn btn-dark mt-3"
                onClick={handleLoginClick}
                >
                Send
                </button>
            </div>
            </div>
        </div>
        </div>
    );
    };

export default ForgotPassword;
