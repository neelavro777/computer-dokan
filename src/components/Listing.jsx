import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import ImageUpload from "./ImageUpload";

import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Listing = () => {
  // const [image, setImage] = useState(null);
  const [allItems, setAllItems] = useState(null);
  // const [product, setProduct] = useState("");
  // const [category, setCategory] = useState("");
  // const [price, setPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  //Cart
  const { addToCart } = useCart();
  const quantity = 1;
  const handleAddToCart = (event, product) => {
    event.preventDefault();
    toast.success("Added to cart");
    addToCart({ ...product, quantity });
  };

  useEffect(() => {
    getItem();
  }, []);

  const getItem = async () => {
    const result = await axios.get(
      "http://localhost:5000/api/product/get-item"
    );
    console.log(result);
    setAllItems(result.data);
    setLoading(false);
  };

  return (
    <>
      <div style={{ backgroundColor: "rgb(242, 242, 242)" }}>
        <div className="container mt-4">
          {/*<h1 className="mb-4">Category Page</h1>*/}
          <div className="row">
            {loading ? (
              <p>Loading...</p>
            ) : allItems.length === 0 ? (
              <p>No products found for this category.</p>
            ) : (
              allItems.map((product) => (
                <div key={product.id} className="col-md-4 col-lg-3 mb-4">
                  <div
                    className="card h-100 "
                    style={{
                      transition: "box-shadow 0.3s ease",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "500px",
                      overflow: "auto",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0px 0px 15px 5px rgba(0,0,0,0.1)";
                      e.currentTarget.querySelector(
                        ".card-img-top"
                      ).style.transform = "scale(1.1)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.boxShadow = "";
                      e.currentTarget.querySelector(
                        ".card-img-top"
                      ).style.transform = "scale(1)";
                    }}
                  >
                    <Link
                      to={`/product/${product.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div style={{ overflow: "hidden" }}>
                        <img
                          src={`http://localhost:5000/uploads/${product.image}`}
                          className="card-img-top"
                          alt="product"
                          style={{
                            width: "100%",
                            maxHeight: "100%",
                            objectFit: "cover",
                            transition: "transform 0.3s ease",
                          }}
                        />
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">{product.product}</h5>
                        <p className="card-text">{product.price}</p>
                        {product.keySpecifications && (
                          <ul className="list-group list-group-flush">
                            {Object.entries(product.keySpecifications)
                              .slice(0, 4)
                              .map(([key, value]) => (
                                <li key={key} className="list-group-item">
                                  <strong>{key}:</strong> {value}
                                </li>
                              ))}
                          </ul>
                        )}
                      </div>
                    </Link>
                    <div className="card-footer">
                      <button
                        onClick={(event) => handleAddToCart(event, product)}
                        className="btn btn-dark w-100"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      {/*
      <div>
        <input
          type="text"
          className="form-control mt-3"
          placeholder="Search by product name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="row">
          {allItems === null
            ? ""
            : allItems
                .filter((item) => {
                  return searchTerm.toLowerCase() === ""
                    ? item
                    : item.product.toLowerCase().includes(searchTerm);
                })
                .map((data) => <ProductCard key={data.id} data={data} />)}
        </div>
              </div>*/}
    </>
  );
};

export default Listing;
