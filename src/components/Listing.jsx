import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import ImageUpload from "./ImageUpload";

const Listing = () => {

  // const [image, setImage] = useState(null);
  const [allItems, setAllItems] = useState(null);
  // const [product, setProduct] = useState("");
  // const [category, setCategory] = useState("");
  // const [price, setPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getItem();
  }, []);


  const getItem = async () => {
    const result = await axios.get("http://localhost:5000/api/product/get-item");
    console.log(result);
    setAllItems(result.data);
  };


  return (
    <div>
      <input
        type="text"
        className="form-control mt-3"
        placeholder="Search by product name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="row">
        {allItems === null
            ? ""
            : allItems.filter((item) => {
                return searchTerm.toLowerCase()==="" ? item : item.product.toLowerCase().includes(searchTerm);
              })
            .map((data) => (
              <ProductCard key={data.id} data={data} />
            ))}
      </div>

    </div>
  );
  
};

export default Listing;