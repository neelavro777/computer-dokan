import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageUpload from "../components/ImageUpload";
import ImageList from "../components/ImageList";


const AdminPage = () => {
    const [images, setImages] = useState([]);
  
    useEffect(() => {
      getImages();
    }, []);
  
    const getImages = async () => {
      const result = await axios.get("http://localhost:5000/api/product/get-item");
      setImages(result.data);
    };
  
    const onDelete = async (id) => {
      await axios.delete(`http://localhost:5000/api/product/delete-item/${id}`);
      getImages();
    };
  
    const onEdit = (id) => {
      // handle edit
    };
  
    return (
      <div>
        <h1>Admin Page</h1>
        <ImageUpload onUpload={getImages} />
        <ImageList images={images} onDelete={onDelete} onEdit={onEdit} />
      </div>
    );
  };
  
  export default AdminPage;