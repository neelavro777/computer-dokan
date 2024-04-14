import React from "react";

const ImageList = ({ images, onDelete, onEdit }) => {
  return (
    <div className="container">
      <div className="row">
        {images.map((image) => (
          <div key={image.id} className="col-sm-4">
            <div className="card">
              <img src={`http://localhost:5000/uploads/${image.image}`} alt={image.product} className="card-img-top" style={{ width: "100%", height: "200px" }}/>
              <div className="card-body">
                <h5 className="card-title">{image.product}</h5>
                <p className="card-text">Category: {image.category}</p>
                <p className="card-text">Price: {image.price}</p>
                <button onClick={() => onEdit(image.id)} className="btn btn-primary mr-2">Edit</button>
                <button onClick={() => onDelete(image.id)} className="btn btn-danger">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageList;