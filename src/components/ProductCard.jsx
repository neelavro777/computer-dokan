import React from "react";

const ProductCard = ({ data }) => {
  return (
    <div className="col-md-2 mb-2">
      <a
        href={`/view-product/:${data.id}`}
        className="card-link"
        style={{ textDecoration: "none" }}
      >
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
          </div>
        </div>
      </a>
    </div>
  );
};

export default ProductCard;
