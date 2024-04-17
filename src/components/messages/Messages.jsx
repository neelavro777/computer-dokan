import React, { useEffect } from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { useChatContext } from "../../context/ChatContext";
import axios from "axios";
import { useSocketContext } from "../../context/SocketContext";
import OfferMessage from "./OfferMessage";
import AcceptedMessage from "./AcceptedMessage";
import RejectedMessage from "./RejectedMessage";
import { useProductContext } from "../../context/ProductContext";

const Messages = () => {
  const { selectedUser, chats, setChats, reloadMessages, setReloadMessages } =
    useChatContext();
  const {  setOfferStatus } = useProductContext();
  console.log(selectedUser);
  const { socket } = useSocketContext();

  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
      setChats([...chats, newMessage]);
    });
    return () => socket.off("newMessage");
  }, [socket, chats, setChats]);

  useEffect(() => {
    socket.on("offerStatusChanged", () => {
      setReloadMessages(true);
      setOfferStatus(true);
    });
    return () => socket.off("offerStatusChanged");
  }, [socket, setReloadMessages, setOfferStatus]);

  const getMessages = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/message/${selectedUser._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const data = await res.data;
      if (Array.isArray(data) && data.length > 0) {
        console.log(data);
        setChats(data);
      } else {
        setChats([]);
      }
    } catch (error) {
      console.error(error);
      setChats([]);
    }
    setReloadMessages(false);
  };

  useEffect(() => {
    getMessages();
  }, [selectedUser, reloadMessages, setChats]); 

  console.log(chats);

  return (
    <div className="px-4 flex-grow-1 overflow-auto d-flex flex-column border-top pt-4">
      {chats.map(
        (chat) =>
          chat &&
          (chat.offer ? (
            chat.offer.status === "pending" ? (
              <OfferMessage key={chat._id} chat={chat} />
            ) : chat.offer.status === "accepted" ? (
              <AcceptedMessage key={chat._id} chat={chat} />
            ) : chat.offer.status === "declined" ? (
              <RejectedMessage key={chat._id} chat={chat} />
            ) : null
          ) : (
            <Message key={chat._id} chat={chat} />
          ))
      )}
      <MessageInput />
    </div>
  );
};

export default Messages;
