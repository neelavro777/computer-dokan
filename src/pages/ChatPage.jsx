import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { ChatContextProvider } from '../context/ChatContext';
import ChatSidebar from "../components/chatsidebar/ChatSidebar";
import MessageContainer from "../components/messages/MessageContainer";

const ChatPage = () => {
    return (
        // <ChatContextProvider>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4">
                    <ChatSidebar />
                </div>
                <div className="col-md-8">
                    <MessageContainer/>
                </div>
            </div>
            <h1>Chat Page</h1>
        </div>
        // {/* </ChatContextProvider> */}
    )
}

export default ChatPage;