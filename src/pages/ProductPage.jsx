import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReviewForm from "../components/ReviewForm";
import ReviewDisplay from "../components/ReviewDisplay";
import ProductPageDashboard from "../components/ProductPageDashboard";
import SpecificationTable from "../components/SpecificationTable";
import Navbar from "../components/Navbar";
import ReactPlayer from "react-player";

const ProductPage = () => {
  const { id } = useParams();
  const [useriD, setUseriD] = useState("");
  const [username, setusername] = useState("");
  const [activeTab, setActiveTab] = useState("active");
  const [product, setProduct] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoLinks = {
    "Graphics Card": "https://youtu.be/7fz3p7Wt0FQ?si=QhodKhMfISK5zrMw",
    Motherboard: "https://youtu.be/Ce4xTcKe5bs?si=kATffWAJ9cVsYHN2",
    RAM: "https://youtu.be/kRMJwiXhrEU?si=Ybeb1lhq1E70o0Za",
    "Power Supply": "https://youtu.be/gdPnsuo8AVw?si=P7AmkX-dQlvq6rn0",
    Processor: "https://youtu.be/6t8YhRTqLfA?si=_cCicwPBxspkclPn",
  };
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setShowVideo(false); // Close the video tab if another tab is clicked
  };

  useEffect(() => {
    const originalBackgroundColor = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "rgb(242, 242,242)";
    const token = localStorage.getItem("accessToken");
    if (token) {
      setUseriD(localStorage.getItem("userId"));
      setusername(localStorage.getItem("userName"));
    }
    return () => {
      document.body.style.backgroundColor = originalBackgroundColor;
    };
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/product/get-product/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  return (
    <div className="">
      <Navbar />
      <h1>ProductPage</h1>

      <div className="py-5">
        <ProductPageDashboard productID={id} product={product} />
      </div>
      <div className="container mx-auto w-75">
        <div
          className="btn-group text-white py-3"
          role="group"
          aria-label="..."
        >
          <button
            type="button"
            className={`btn btn-${
              activeTab === "active" ? "dark" : "default"
            } ${activeTab === "active" ? "active" : ""}`}
            onClick={() => setActiveTab("active")}
            onMouseOver={(e) =>
              activeTab === "active"
                ? (e.target.style.backgroundColor = "")
                : (e.target.style.backgroundColor = "#343a40")
            }
            onMouseOut={(e) =>
              activeTab === "active"
                ? (e.target.style.backgroundColor = "")
                : (e.target.style.backgroundColor = "white")
            }
          >
            Specifications
          </button>
          <button
            type="button"
            className={`btn btn-${activeTab === "link" ? "dark" : "default"} ${
              activeTab === "link" ? "active" : ""
            }`}
            onClick={() => setActiveTab("link")}
            onMouseOver={(e) =>
              activeTab === "link"
                ? (e.target.style.backgroundColor = "")
                : (e.target.style.backgroundColor = "#343a40")
            }
            onMouseOut={(e) =>
              activeTab === "link"
                ? (e.target.style.backgroundColor = "")
                : (e.target.style.backgroundColor = "white")
            }
          >
            Reviews
          </button>
          <button
            type="button"
            className={`btn btn-${activeTab === "video" ? "dark" : "default"} ${
              activeTab === "video" ? "active" : ""
            }`}
            onClick={() => setActiveTab("video")}
            onMouseOver={(e) =>
              activeTab === "video"
                ? (e.target.style.backgroundColor = "")
                : (e.target.style.backgroundColor = "#343a40")
            }
            onMouseOut={(e) =>
              activeTab === "video"
                ? (e.target.style.backgroundColor = "")
                : (e.target.style.backgroundColor = "white")
            }
          >
            Video
          </button>
        </div>
        {activeTab === "link" ? (
          <div className="py-3 ">
            <div className="">
              <ReviewDisplay productID={id} />
            </div>
            <div className="">
              <button
                className="btn btn-dark "
                type="button"
                onClick={() =>
                  setShowReviewForm((prevShowReviewForm) => !prevShowReviewForm)
                }
              >
                Write Review
              </button>
              {showReviewForm && (
                <ReviewForm
                  productID={id}
                  userID={useriD}
                  userName={username}
                />
              )}
            </div>
          </div>
        ) : null}
        {activeTab === "active" && (
          <div className="border rounded ">
            <SpecificationTable specifications={product.specifications} />
          </div>
        )}
        {activeTab === "video" && (
          <div className="d-flex justify-content-center py-7">
            <div className=" ">
              <ReactPlayer url={videoLinks[product.category]} controls={true} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
