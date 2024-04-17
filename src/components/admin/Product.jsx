import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch products from the server
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await Axios.get(
          "http://localhost:5000/api/product/get-item"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProducts();
  }, []);

  // Delete product by id
  const deleteProduct = async (id) => {
    try {
      const response = await Axios.delete(
        `http://localhost:5000/api/product/delete-item/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (response.data.status === "ok") {
        alert("Product deleted successfully");
        // Refresh the list after deletion
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  return (
    <div className="container mt-3">
      <h2>Products List</h2>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by product name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
      />
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products
            .filter((product) =>
              product.product.toLowerCase().includes(searchTerm)
            )
            .map((product) => (
              <tr key={product._id}>
                <td>{product.id}</td>
                <td>{product.product}</td>
                <td>{product.category}</td>
                <td>${product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Link to={`/product/${product.id}`}>
                      <button className="btn btn-primary">View</button>
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Product;
