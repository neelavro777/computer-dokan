import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { set } from "mongoose";
import Navbar from "../components/Navbar";

const SearchPage = () => {
  const [loading, setLoading] = useState(true);
  //Cart
  const { addToCart } = useCart();
  const quantity = 1;
  const handleAddToCart = (event, product) => {
    event.preventDefault();
    toast.success("Added to cart");
    addToCart({ ...product, quantity });
  };

  const [products, setProducts] = useState([]);
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("q");

  useEffect(() => {
    if (query) {
      fetchProducts(query);
    }
  }, [query]);

  const fetchProducts = async (query) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/search?q=${query}`
      );
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  return (
    <>
      <Navbar />
      {/*<div className="container mt-3">
        <h1>Search Results</h1>
        <ul className="list-group">
          {products.map((product, index) => (
            <li key={index} className="list-group-item">
              <strong>{product.product}</strong> - {product.category} - $
              {product.price} - Stock: {product.stock}
            </li>
          ))}
        </ul>
        </div>*/}

      <div className="container mt-4">
        {/*<h1 className="mb-4">Category Page</h1>*/}
        <div className="row">
          {loading ? (
            <p>Loading...</p>
          ) : products.length === 0 ? (
            <p>No products found for this category.</p>
          ) : (
            products.map((product) => (
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
    </>
  );
};

export default SearchPage;
