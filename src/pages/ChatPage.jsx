import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { ChatContextProvider } from '../context/ChatContext';
import ChatSidebar from "../components/chatsidebar/ChatSidebar";
import MessageContainer from "../components/messages/MessageContainer";
import { IoMdArrowRoundBack } from "react-icons/io";
import PendingOffers from "../components/chatsidebar/PendingOffers";
import SendOffer from "../components/chatsidebar/SendOffer";
import { useProductContext } from "../context/ProductContext";

const ChatPage = () => {
  const { newOffer, setNewOffer } = useProductContext();
  return (
    // <ChatContextProvider>
    <>
      <div className="container-fluid vh-100">
        <div className="row h-100">
          <div className="col-md-3  pt-3 bg-light">
            <div className="px-3 d-flex gap-2 align-items-center">
              <Link to="/">
                <button className="btn px-1">
                  <IoMdArrowRoundBack size={26} />
                </button>
              </Link>

              <p className="fs-3 mb-1 fw-semibold">Chat</p>
            </div>
            <ChatSidebar />
          </div>
          <div className="col-md-6 p-0">
            <MessageContainer />
          </div>
          <div className="col-md-3">
            <div className="pt-4 mb-4 border-bottom">
              <p className="ps-2 fs-5 fw-semibold">Offer History</p>
            </div>

            <PendingOffers />
            {newOffer && <SendOffer product={newOffer} />}
          </div>
        </div>
      </div>
    </>
    // {/* </ChatContextProvider> */}
  );
};

export default ChatPage;
