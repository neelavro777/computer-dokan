import React, { useEffect } from "react";
import Messages from "./Messages";
import { useChatContext } from "../../context/ChatContext";

const MessageContainer = () => {
  const { selectedUser, setSelectedUser } = useChatContext();
  const isNoChatSelected = !selectedUser;

  return (
    <div class="vh-100 d-flex flex-column py-3 border border-gray ">
      {isNoChatSelected ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="px-4 py-2 mb-2 bg-blue-500 text-black">
            <span className="text-lg font-bold">To: </span>
            <span className="text-lg font-bold">{selectedUser.fullName}</span>
          </div>
          <Messages />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  return (
    <div class="d-flex flex-grow-1 justify-content-center align-items-center">
      <div class="px-4 text-center text-lg text-gray-200 font-weight-bold d-flex flex-column align-items-center gap-2">
        <p>Welcome</p>
        <p class="text-lg font-weight-bold">Select a chat to start messaging</p>
      </div>
    </div>
  );
};
