import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const OrderHistory = () => {
  const { authUser, setAuthUser } = useAuthContext();

  const userId = authUser.userId;
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/order-history/${userId}`
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching order history:", error);
        setError("Failed to fetch order history.");
      }
    };

    fetchOrderHistory();
  }, [userId]);

  return (
    <div className="container my-4">
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="list-group">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className="list-group-item">
              <h5>Order ID: {order.tran_id}</h5>
              <p>Status: {order.status}</p>
              <p>Total Price: ${order.totalPrice}</p>
              <ul>
                {order.products.map((product, idx) => (
                  <li key={idx}>
                    Product: {product.productId.product} <br />
                    Quantity: {product.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
