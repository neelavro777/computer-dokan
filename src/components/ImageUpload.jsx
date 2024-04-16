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
    // Convert forms array to specifications object
    const specificationsArray = forms.map((form) => {
      return {
        [form.name]: form.inputs.map((input) => ({ [input.key]: input.value })),
      };
    });
    formData.append("specifications", JSON.stringify(specificationsArray));

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
    <div>
      <form onSubmit={onUploadItem}>
        <div className="w-50">
          <input
            type="file"
            accept="image/*"
            onChange={onInputChange}
            placeholder="Upload image"
          />
          <input
            className="form-control"
            type="text"
            placeholder="Product"
            aria-label="Product"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />
          <input
            className="form-control"
            type="text"
            placeholder="Category"
            aria-label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            className="form-control"
            type="text"
            placeholder="Price"
            aria-label="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          {/* Render input fields for forms */}
          {forms.map((form, formIndex) => (
            <div key={formIndex}>
              <input
                type="text"
                placeholder="Form Name"
                value={form.name}
                onChange={(e) => handleFormChange(formIndex, e.target.value)}
              />
              {/* Render input fields for inputs */}
              {form.inputs.map((input, inputIndex) => (
                <div key={inputIndex}>
                  <input
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
              <button type="button" onClick={() => handleAddInput(formIndex)}>
                Add Input
              </button>
            </div>
          ))}

          {/* Button to add a new form */}
          <button type="button" onClick={handleAddForm}>
            Add Form
          </button>
        </div>
        <button className="btn btn-danger" type="submit">
          Post
        </button>
      </form>
    </div>
  );
};

export default ImageUpload;
