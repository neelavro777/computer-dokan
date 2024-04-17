import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Dashboard from "../components/admin/Dashboard";
import Product from "../components/admin/Product";
import User from "../components/admin/User";
import AdminAddProduct from "../components/admin/AdminAddProduct";
import AdminAddUser from "../components/admin/AdminAddUser";

const AdminPage = () => {
  const [currentTab, setCurrentTab] = useState("dashboard");

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse border-end">
            <ul className="nav flex-column gap-3 mt-4">
              <li
                className={`btn nav-item nav-pills ${
                  currentTab === "dashboard" ? "btn-dark" : ""
                }`}
                onClick={() => setCurrentTab("dashboard")}
              >
                Dashboard
              </li>
              <li
                className={`btn nav-item nav-pills ${
                  currentTab === "user" ? "btn-dark" : ""
                }`}
                onClick={() => setCurrentTab("user")}
              >
                User
              </li>
              <li
                className={`btn nav-item nav-pills ${
                  currentTab === "product" ? "btn-dark" : ""
                }`}
                onClick={() => setCurrentTab("product")}
              >
                Product
              </li>
              <li
                className={`btn nav-item nav-pills ${
                  currentTab === "addProduct" ? "btn-dark" : ""
                }`}
                onClick={() => setCurrentTab("addProduct")}
              >
                Add Product
              </li>
              <li
                className={`btn nav-item nav-pills ${
                  currentTab === "addUser" ? "btn-dark" : ""
                }`}
                onClick={() => setCurrentTab("addUser")}
              >
                Add User
              </li>
            </ul>
          </div>

          {/* Main Content */}
          <div className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            {currentTab == "dashboard" ? <Dashboard /> : null}
            {currentTab == "user" ? <User /> : null}
            {currentTab == "product" ? <Product /> : null}
            {currentTab == "addProduct" ? <AdminAddProduct /> : null}
            {currentTab == "addUser" ? <AdminAddUser /> : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
