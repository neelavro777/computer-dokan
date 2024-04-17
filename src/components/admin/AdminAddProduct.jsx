import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageUpload from "../ImageUpload";
import ImageList from "../ImageList";

const AdminAddProduct = () => {
  const [images, setImages] = useState([]);

  const getImages = async () => {
    const result = await axios.get(
      "http://localhost:5000/api/product/get-item"
    );
    setImages(result.data);
  };

  useEffect(() => {
    getImages();
  }, []);

  const onDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/product/delete-item/${id}`);
    getImages();
  };

  const onEdit = (id) => {
    // handle edit
  };

  return (
    <div>
      <ImageUpload onUpload={getImages} />
      <ImageList images={images} onDelete={onDelete} onEdit={onEdit} />
    </div>
  );
};

export default AdminAddProduct;
