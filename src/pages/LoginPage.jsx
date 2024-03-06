import React, { useState } from "react";
import axios from "axios";
import "../globals.css";
import Login from "../components/Login";
import CreateAccount from "../components/CreateAccount";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Registration failed:", error.response.data.error);
    }
  };
  return (
    <div className="container-fluid bg-dark text-white vh-100">
      {/* Heading */}
      <div className="row bg-light border" style={{ height: "10%" }}>
        <h2 className="text-black py-3 px-2">Computer Dokan</h2>
      </div>
      {/* Login Component */}
      <div className="row" style={{ height: "90%" }}>
        <div className="bg-secondary d-flex align-items-center col-12 col-lg-6">
          <Login />
        </div>
        {/* Create Account Component */}
        <div className="bg-light d-flex align-items-center col-12 col-lg-6">
          <CreateAccount />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

// import React, { useState } from 'react';
// import '../globals.css';
// // style={{ height: "90vh", maxWidth: "75%" }}
// const RegistrationPanel = ({ onClose }) => {
//   return (
//     <div className="modal fixed-modal" style={{ display: "block"}} >
//       <div className="modal-dialog d-flex justify-content-center " style={{ height: "90vh", maxWidth: "75%" }} >

//         <div className="modal-content bg-dark" style={{ backgroundImage: "url('./bg7.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
//           <div className="csb d-flex justify-content-end "><button type="submit" className="btn btn-danger"  onClick={onClose} >Exit</button></div>

//           <div className="w-50 col-md-6" >
//             <h5 className="modal-title text-white d-flex justify-content-center py-3 fs-1" >Create Account</h5>
//             {/* <button type="button" className="btn-close" onClick={onClose}></button> */}
//           </div>
//           {/* <div className="col-md-6">
//             <button type="button" className="btn btn-danger text-white" onClick={onClose}>Close</button>
//           </div> */}
//           <div className="modal-body text-white">
//             <div className='w-50 px-5 py-3'>
//               <form className="row g-3">
//                 <div className="col-md-6">
//                   <label htmlFor="inputEmail4" className="form-label">First Name</label>
//                   <input type="email" className="form-control bg-dark border-danger text-white " id="inputEmail4" />
//                 </div>
//                 <div className="col-md-6">
//                   <label htmlFor="inputPassword4" className="form-label">Last Name</label>
//                   <input type="password" className="form-control bg-dark border-danger text-white " id="inputPassword4" />
//                 </div>
//                 <div className="col-md-12">
//                   <label htmlFor="inputAddress" className="form-label">Email</label>
//                   <input type="text" className="form-control bg-dark  border border-danger text-white" id="inputAddress" placeholder="1234 Main St" />
//                 </div>
//                 <div className="col-md-12">
//                   <label htmlFor="inputAddress2" className="form-label">Password</label>
//                   <input type="text" className="form-control bg-dark  border border-danger text-white" id="inputAddress2" placeholder="Apartment, studio, or floor" />
//                 </div>
//                 <div className="col-md-6">
//                   <label htmlFor="inputCity" className="form-label">Birthday</label>
//                   <input type="text" className="form-control bg-dark border border-danger text-white" id="inputCity" />
//                 </div>
//                 <div className="col-md-4">
//                   <label htmlFor="inputState" className="form-label">Gender</label>
//                   <select id="inputState" className="form-select bg-dark border-danger text-white">
//                     <option selected>Choose...</option>
//                     <option>...</option>
//                   </select>
//                 </div>
//                 <div className="col-md-12">
//                   <div className="form-check">
//                     <input className="form-check-input" type="checkbox" id="gridCheck" />
//                     <label className="form-check-label" htmlFor="gridCheck">
//                       Check me out
//                     </label>
//                   </div>
//                 </div>
//                 <div className="col-md-12 d-flex justify-content-center">
//                   <button type="submit" className="btn btn-danger text-white custom-btn">Sign in</button>
//                 </div>
//               </form>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

// const Login = () => {
//   const [showRegistration, setShowRegistration] = useState(false);

//   const openRegistrationPanel = () => {
//     setShowRegistration(true);
//   };

//   const closeRegistrationPanel = () => {
//     setShowRegistration(false);
//   };

//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className="d-flex justify-content-center align-items-center vh-100 col-md-6 p-4 bg-dark">
//           <div className="w-100">
//             <div className="d-flex justify-content-center mb-3 text-white">
//               Login
//             </div>
//             <form>
//               <div className='mb-3'>
//                 <input type="email" className="form-control bg-dark border border-primary rounded-6 text-white" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" style={{ color: 'white' }} />
//               </div>
//               <div className="mb-3">
//                 <input type="password" className="form-control bg-dark border border-primary rounded-6" id="exampleInputPassword1" placeholder="Password" />
//               </div>
//               <div className="d-flex justify-content-center">
//                 <button type="button" className="btn btn-dark border border-success text-success rounded-6" >Submit</button>
//               </div>
//             </form>
//           </div>
//         </div>
//         <div className="d-flex justify-content-center align-items-center vh-100 col-md-6 p-4 bg-dark">
//           <div className="w-50 py-5">
//             <button type="button" className="btn btn-dark border border-success text-success rounded-6" onClick={openRegistrationPanel}>Register</button>
//           </div>
//         </div>
//       </div>
//       {showRegistration && <RegistrationPanel onClose={closeRegistrationPanel} />}
//     </div>
//   );
// }

// export default Login;
