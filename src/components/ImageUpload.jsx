import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
const ImageUpload = ({ onUpload }) => {
  const { authUser } = useAuthContext();
  const [image, setImage] = useState(null);
  const [product, setProduct] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [forms, setForms] = useState([]);
  const [keyValuePairs, setKeyValuePairs] = useState([{ key: "", value: "" }]);
  const [stock, setStock] = useState("");

  useEffect(() => {
    getItem();
  }, []);

  const onUploadItem = async () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("product", product);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("uploadedBy", authUser.userMId);
    formData.append("stock", stock);
    // Convert forms array to specifications object
    const specificationsArray = forms.map((form) => {
      return {
        [form.name]: form.inputs.map((input) => ({ [input.key]: input.value })),
      };
    });
    formData.append("specifications", JSON.stringify(specificationsArray));

    const keySpecifications = keyValuePairs.reduce((obj, pair) => {
      return { ...obj, [pair.key]: pair.value };
    }, {});

    formData.append("keySpecifications", JSON.stringify(keySpecifications));

    try {
      const res = await axios.post(
        "http://localhost:5000/api/product/upload-item",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
      getItem();
      setProduct("");
      setCategory("");
      setPrice("");
      setForms([]);
      onUpload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleFormChange = (index, value) => {
    const updatedForms = [...forms];
    updatedForms[index].name = value;
    setForms(updatedForms);
  };

  const handleAddForm = () => {
    setForms([...forms, { name: "", inputs: [{ key: "", value: "" }] }]);
  };

  const handleAddInput = (formIndex) => {
    const updatedForms = [...forms];
    updatedForms[formIndex].inputs.push({ key: "", value: "" });
    setForms(updatedForms);
  };

  const handleInputChange = (formIndex, inputIndex, keyOrValue, value) => {
    const updatedForms = [...forms];
    updatedForms[formIndex].inputs[inputIndex][keyOrValue] = value;
    setForms(updatedForms);
  };

  const onInputChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handlePairChange = (index, keyOrValue, value) => {
    const updatedPairs = [...keyValuePairs];
    updatedPairs[index][keyOrValue] = value;
    setKeyValuePairs(updatedPairs);
  };

  const handleAddPair = () => {
    setKeyValuePairs([...keyValuePairs, { key: "", value: "" }]);
  };

  const getItem = async () => {
    try {
      const result = await axios.get(
        "http://localhost:5000/api/product/get-item"
      );
      console.log(result);
      // Update state or do something with result
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-3 px-5">
      <p className="fs-3 fw-semibold pt-3">Add Product</p>
      <hr />
      <form onSubmit={onUploadItem} className="">
        <div className="mb-3">
          <label htmlFor="imageUpload" className="form-label">
            Upload Image
          </label>
          <input
            className="form-control"
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={onInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">
            Product
          </label>
          <input
            className="form-control"
            type="text"
            id="productName"
            placeholder="Product"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="categoryName" className="form-label">
            Category
          </label>
          <input
            className="form-control"
            type="text"
            id="categoryName"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productPrice" className="form-label">
            Price
          </label>
          <input
            className="form-control"
            type="text"
            id="productPrice"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">
            Stock
          </label>
          <input
            className="form-control"
            type="text"
            id="productName"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>

        {forms.map((form, formIndex) => (
          <div key={formIndex} className="mb-3">
            <label htmlFor={`formName-${formIndex}`} className="form-label">
              Form Name
            </label>
            <input
              className="form-control"
              type="text"
              id={`formName-${formIndex}`}
              placeholder="Form Name"
              value={form.name}
              onChange={(e) => handleFormChange(formIndex, e.target.value)}
            />

            {form.inputs.map((input, inputIndex) => (
              <div key={inputIndex} className="mb-2">
                <input
                  className="form-control mb-1 mt-1"
                  type="text"
                  placeholder="Key"
                  value={input.key}
                  onChange={(e) =>
                    handleInputChange(
                      formIndex,
                      inputIndex,
                      "key",
                      e.target.value
                    )
                  }
                />
                <input
                  className="form-control"
                  type="text"
                  placeholder="Value"
                  value={input.value}
                  onChange={(e) =>
                    handleInputChange(
                      formIndex,
                      inputIndex,
                      "value",
                      e.target.value
                    )
                  }
                />
              </div>
            ))}
            <button
              className="btn btn-secondary mb-2"
              type="button"
              onClick={() => handleAddInput(formIndex)}
            >
              Add Input
            </button>
          </div>
        ))}

        <button
          className="btn btn-secondary mb-3"
          type="button"
          onClick={handleAddForm}
        >
          Add Form
        </button>
        {keyValuePairs.map((pair, index) => (
          <div key={index} className="mb-3">
            <label htmlFor={`key-${index}`} className="form-label">
              Key Specification label
            </label>
            <input
              className="form-control"
              type="text"
              id={`key-${index}`}
              placeholder="Key"
              value={pair.key}
              onChange={(e) => handlePairChange(index, "key", e.target.value)}
            />
            <label htmlFor={`value-${index}`} className="form-label">
              Key Specification Value
            </label>
            <input
              className="form-control"
              type="text"
              id={`value-${index}`}
              placeholder="Value"
              value={pair.value}
              onChange={(e) => handlePairChange(index, "value", e.target.value)}
            />
          </div>
        ))}
        <button
          className="btn btn-secondary mb-3"
          type="button"
          onClick={handleAddPair}
        >
          Add Key Specification
        </button>

        <div>
          <button className="btn btn-primary mb-3" type="submit">
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default ImageUpload;
