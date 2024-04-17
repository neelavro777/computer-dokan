import React, { useState } from "react";
import ImageUpload from "../components/ImageUpload";
import Navbar from "../components/Navbar";
import SellerAddProduct from "../components/seller/SellerAddProduct";
import Product from "../components/seller/Product";

const SellerPage = () => {
  const [currentTab, setCurrentTab] = useState("dashboard");
  return (
    <div>
      <Navbar />
      {/*<ImageUpload />*/}
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse border-end">
            <ul className="nav flex-column gap-3 mt-4">
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
            </ul>
          </div>

          {/* Main Content */}
          <div className="col-md-9 ml-sm-auto col-lg-10 px-md-4 vh-100">
            {currentTab == "product" ? <Product /> : null}
            {currentTab == "addProduct" ? <SellerAddProduct /> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerPage;
