import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import ImageUpload from "./ImageUpload";

const Listing = () => {
  const [allItems, setAllItems] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getItem();
  }, []);

  const getItem = async () => {
    const result = await axios.get("http://localhost:5000/api/auth/get-item");
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
          : allItems
              .filter((items) => {
                return searchTerm.toLowerCase() === ""
                  ? items
                  : items.product.toLowerCase().includes(searchTerm);
              })
              .map((data, index) => <ProductCard key={index} data={data} />)}
      </div>
    </div>
  );
};

export default Listing;
