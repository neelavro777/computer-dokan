import React from "react";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";


const ProductCard = ({ data }) => {
  const { addToCart } = useCart();
  const quantity = 1;

  

  const handleAddToCart = (event, product) => {
    event.preventDefault();
    toast.success("Added to cart");
    addToCart({ ...product, quantity });
  };
  
  return (
    <div className="col-md-2 mb-2">
      <a href={`/product/${data.id}`} className="card-link" style=  {{ textDecoration: 'none' }}>
        <div className="card">
          <img
            className="card-img-top"
            src={`http://localhost:5000/uploads/${data.image}`}
            alt=""
            style={{ width: "100%", height: "200px" }}
          />
          <div className="card-body">
            <h5 className="card-title">{data.product}</h5>
            <p className="card-text">Category: {data.category}</p>
            <p className="card-text">Price: {data.price}</p>
            <button onClick={(event) => handleAddToCart(event, data)} className="btn btn-primary">Add to Cart</button>
          </div>
        </div>
      </a>
    </div>
  );
};

export default ProductCard;