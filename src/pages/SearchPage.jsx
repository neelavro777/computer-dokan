import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

const SearchPage = () => {
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("q");

  useEffect(() => {
    if (query) {
      fetchProducts(query);
    }
  }, [query, filter]);

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

  const handleAddToCart = (event, product) => {
    event.preventDefault();
    toast.success("Added to cart");
    addToCart({ ...product, quantity: 1 });
  };

  const applyFilter = (products) => {
    switch (filter) {
      case "name-asc":
        return [...products].sort((a, b) => a.product.localeCompare(b.product));
      case "name-desc":
        return [...products].sort((a, b) => b.product.localeCompare(a.product));
      case "price-asc":
        return [...products].sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );
      case "price-desc":
        return [...products].sort(
          (a, b) => parseFloat(b.price) - parseFloat(a.price)
        );
      default:
        return products;
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="mb-0">Products</h1>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="form-select w-auto"
          >
            <option value="">Select Filter</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="price-asc">Price (Low-High)</option>
            <option value="price-desc">Price (High-Low)</option>
          </select>
        </div>

        <div className="row">
          {loading ? (
            <p>Loading...</p>
          ) : products.length === 0 ? (
            <p>No products found for this category.</p>
          ) : (
            applyFilter(products).map((product) => (
              <div key={product.id} className="col-md-4 col-lg-3 mb-4">
                <div
                  className="card h-100"
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
