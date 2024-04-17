import React, { useContext, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useChatContext } from "../../context/ChatContext";
import { useSocketContext } from "../../context/SocketContext";
import { useProductContext } from "../../context/ProductContext";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const AcceptedMessage = ({ chat }) => {
  const Navigate = useNavigate();
  const { setproductPrice, setProduct, selectedProduct } = useProductContext();
  const { selectedUser, isAddedToCart, setIsAddedToCart } = useChatContext();
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
  const { addToCart } = useContext(CartContext);
  console.log("AcceptedMessage chat:", chat);
  // console.log('chat.senderId:', chat.senderId);
  console.log("authUser.userType:", authUser.userType);

  const handleAddToCart = () => {
    console.log("Add to cart clicked");
    let product = { ...chat.offer.product };
    console.log(product);
    product.price = chat.offer.offerAmount;
    console.log(product);
    addToCart({ ...product, quantity: 1 });
    setIsAddedToCart(chat.offer.product._id);
    Navigate("/cart");
  };
  console.log("isAddedToCart:", isAddedToCart);

  return (
    <div className={`d-flex ${chatClassName}`}>
      <div>
        <div className={`text-muted small ${textClass}`}>{senderName}</div>
        <div
          className={`d-inline-block rounded rounded-5 px-4 py-3 ${messageClass} ${bubbleClass}`}
        >
          <div>{chat.content}</div>
          {!fromMe ? (
            authUser.userType === "seller" ? (
              <div>
                <p className="fs-5 fw-semibold pt-2">
                  {" "}
                  You have accepted this buyer's offer{" "}
                </p>
              </div>
            ) : (
              <div>
                <p className="fs-5 fw-semibold pt-2">
                  {" "}
                  You have accepted this seller's offer{" "}
                </p>
              </div>
            )
          ) : authUser.userType === "seller" ? (
            <div>
              <p className="fs-5 fw-semibold pt-2">
                {" "}
                Buyer has accepted your offer{" "}
              </p>
            </div>
          ) : (
            <div>
              <p className="fs-5 fw-semibold pt-2">
                {" "}
                Seller has accepted your offer{" "}
              </p>
            </div>
          )}
          {authUser.userType === "customer" && (
            <button
              className="btn btn-light"
              onClick={handleAddToCart}
              disabled={isAddedToCart === chat.offer.product._id}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AcceptedMessage;
