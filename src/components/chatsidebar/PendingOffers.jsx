import React, { useEffect, useState } from "react";
import axios from "axios"; // Assuming you're using axios to make HTTP requests
import { useChatContext } from "../../context/ChatContext";
import { useProductContext } from "../../context/ProductContext";
import { useSocketContext } from "../../context/SocketContext";

const PendingOffers = () => {
  // const [offers, setOffers] = useState([]);
  const { selectedUser } = useChatContext();
  const {
    selectedProduct,
    setSelectedProduct,
    setOffers,
    offers,
    setSelectedOffer,
    selectedOffer,
    offerStatus,
    setOfferStatus,
  } = useProductContext();

  const { socket } = useSocketContext();

  // useEffect(() => {
  //   if (socket){
  //     socket.on("newOffer", (newOffer) => {
  //     setOffers([...offers, newOffer]);
  //   });
  //   return () => socket.off("newOffer");}

  // }, [socket, setOffers, offers]);

  useEffect(() => {
    if (socket) {
      socket.on("newOffer", (newOffer) => {
        setOffers((prevOffers) => [...prevOffers, newOffer]);
      });

      return () => socket.off("newOffer");
    }
  }, [socket, setOffers]);

  const handleClick = (offer, index) => {
    // setSelectedProduct(offer.product);
    // setSelectedOffer(offer);
    console.log(offer);
  };

  // useEffect(() => {
  //   const fetchOffers = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:5000/api/offer/get-offers/${selectedUser._id}`, {
  //           headers: {
  //               Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  //           },
  //       });
  //       const data = await response.data;
  //       // setOffers();
  //       if (Array.isArray(data) && data.length > 0) {
  //         console.log(data)
  //         setOffers(data);
  //       } else {
  //         setOffers([]);
  //       }
  //       // setOffers(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   if (selectedUser?._id) {
  //     fetchOffers();
  //   }
  // }, [selectedUser, setOffers]);

  const fetchOffers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/offer/get-offers/${selectedUser._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await response.data;
      // setOffers();
      if (Array.isArray(data) && data.length > 0) {
        console.log(data);
        setOffers(data);
      } else {
        setOffers([]);
      }
      // setOffers(data);
    } catch (error) {
      console.error(error);
    }
    setOfferStatus(false);
  };

  useEffect(() => {
    if (selectedUser?._id) {
      fetchOffers();
    }
  }, [selectedUser, setOffers, offerStatus]);

  console.log(offers);

  return (
    <div className="d-flex flex-column gap-2">
      {selectedUser &&
        offers &&
        offers.map((offer, index) => (
          <div
            key={index}
            className={`d-flex gap-2 align-items-center rounded rounded-4 px-3 py-3 my-1 bg-white border border-black ${
              selectedOffer === offer
                ? offer.offerStatus === "declined"
                  ? "bg-danger"
                  : offer.offerStatus === "accepted"
                  ? "bg-success"
                  : offer.offerStatus === "pending"
                  ? "bg-info"
                  : ""
                : "bg-light"
            }`}
            onClick={() => handleClick(offer, index)}
          >
            <div className="d-flex flex-column flex-grow-1">
              <div className="d-flex gap-3 justify-content-between align-content-center">
                <p className="font-bold">Product: {offer.product.product}</p>
                <p className="font-bold">Offered Price: {offer.offerAmount}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PendingOffers;
