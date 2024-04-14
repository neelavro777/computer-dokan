import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";


const ImageUpload = ({ onUpload }) => {
  const [image, setImage] = useState(null);
  const [allItems, setAllItems] = useState(null);
  const [product, setProduct] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");


  useEffect(() => {
    getItem();
  }, []);

  const onUploadItem = async () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append('product', product);
    formData.append('category', category);
    formData.append('price', price);
    console.log(formData);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/upload-item", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      getItem();
      setProduct("");
      setCategory("");
      setPrice("");
      onUpload();
    } catch (err) {
      console.log(err);
    }
  }
 
  const onInputChange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  }

  const getItem = async () => {
    const result = await axios.get("http://localhost:5000/api/auth/get-item");
    console.log(result);
    setAllItems(result.data);
  };


  return (
    <div>
      <form onSubmit={onUploadItem}>
      <div className="w-50">
        <input type="file" accept="image/*" onChange={onInputChange} placeholder="Upload image" />
        <input className="form-control" type="text" placeholder="Product" aria-label="default input example" value={product} onChange={(e) => setProduct(e.target.value)}/>
        <input className="form-control" type="text" placeholder="Category" aria-label="default input example" value={category} onChange={(e) => setCategory(e.target.value)}/>
        <input className="form-control" type="text" placeholder="Price" aria-label="default input example" value={price} onChange={(e) => setPrice(e.target.value)}/>
        {/* <input className="form-control" type="text" placeholder="Default input" aria-label="default input example"/> */}
        </div>
        <button className="btn btn-danger" type="submit">Post</button>
      </form>
    </div>  
    );
}

export default ImageUpload;