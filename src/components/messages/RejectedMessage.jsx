import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useChatContext } from "../../context/ChatContext";
import { useSocketContext } from "../../context/SocketContext";
import { useProductContext } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";

const RejectedMessage = ({ chat }) => {
  const Navigate = useNavigate();
  const {
    setproductPrice,
    setProduct,
    selectedProduct,
    newOffer,
    setNewOffer,
  } = useProductContext();
  const { selectedUser, isAddedToCart } = useChatContext();
  const { authUser } = useAuthContext();
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(selectedUser._id);
  const fromMe = chat.senderId === authUser.userMId;
  const chatClassName = fromMe
    ? "justify-content-end"
    : "justify-content-start";
  const messageClass = fromMe
    ? "bg-primary text-white"
    : "bg-secondary text-white";
  const bubbleClass = fromMe ? " start-0" : " end-0";
  const senderName = fromMe ? authUser.userName : selectedUser.fullName;
  const textClass = fromMe ? "text-end" : "text-start";

  console.log("RejectedMessage chat:", chat);

  return (
    <div className={`d-flex ${chatClassName}`}>
      <div>
        <div className={`text-muted small ${textClass}`}>{senderName}</div>
        <div
          className={`d-inline-block rounded rounded-5 px-3 py-3 ${messageClass} ${bubbleClass}`}
        >
          <div>{chat.content}</div>
          {!fromMe ? ( // the offer was not sent by the logged in user
            authUser.userType === "seller" ? (
              <div>
                <p className="fs-5 fw-semibold py-1">
                  {" "}
                  You have Rejected this buyer's offer{" "}
                </p>
                <p>Price: {chat.offer.product.price}</p>
                <p>Previous Offer: {chat.offer.offerAmount}</p>
                <button
                  onClick={() => setNewOffer(chat.offer.product)}
                  disabled={isAddedToCart === chat.offer.product._id}
                >
                  Make a new Offer
                </button>
              </div>
            ) : (
              // on the buyer side of the bubble
              <div>
                <p className="fs-5 fw-semibold py-1">
                  {" "}
                  Your Offer was rejected Make a new Offer?{" "}
                </p>
                <p>Price: {chat.offer.product.price}</p>
                <p>Previous Offer: {chat.offer.offerAmount}</p>
                {/* <button onClick={() => Navigate(`/product/${chat.offer.product._id}`)}>Make a new Offer</button> */}
                <button
                  className="btn btn-light mb-2"
                  onClick={() => setNewOffer(chat.offer.product)}
                  disabled={isAddedToCart === chat.offer.product._id}
                >
                  Make a new Offer
                </button>
              </div>
            )
          ) : // the offer was sent by the logged in user
          authUser.userType === "seller" ? (
            <div>
              <p className="fs-5 fw-semibold py-1">
                {" "}
                Buyer has rejected your counter-Offer{" "}
              </p>
              <p>Price: {chat.offer.product.price}</p>
              <p>Previous Offer: {chat.offer.offerAmount}</p>
            </div>
          ) : (
            <div>
              <p className="fs-5 fw-semibold py-1">
                {" "}
                Seller has rejected your Offer{" "}
              </p>
              <p>Price: {chat.offer.product.price}</p>
              <p>Previous Offer: {chat.offer.offerAmount}</p>
              {/* <button onClick={() => Navigate(`/product/${chat.offer.product._id}`)}>Make a new Offer</button> */}
              <button
                onClick={() => setNewOffer(chat.offer.product)}
                disabled={isAddedToCart === chat.offer.product._id}
              >
                Make a new Offer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RejectedMessage;
