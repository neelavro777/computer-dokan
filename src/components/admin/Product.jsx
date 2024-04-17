import React, { useEffect, useState } from "react";
import Axios from "axios";

const Product = () => {
  const [products, setProducts] = useState([]);

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
        `http://localhost:5000/delete-item/${id}`
      );
      if (response.data.status === "ok") {
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
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.id}</td>
              <td>{product.product}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteProduct(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Product;
