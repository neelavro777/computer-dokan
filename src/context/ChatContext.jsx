import { createContext, useContext, useState } from "react";

export const ChatContext = createContext();

export const useChatContext = () => useContext(ChatContext);

export const ChatContextProvider = ({ children }) => {
  const [allUsers, setallUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chats, setChats] = useState([]);

  return (
    <ChatContext.Provider value={{ selectedUser, setSelectedUser, chats, setChats, allUsers, setallUsers }}>
      {children}
    </ChatContext.Provider>
  );
};