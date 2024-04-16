// In ChatContextProvider.js
import { createContext, useContext, useState, useEffect } from "react";

export const ChatContext = createContext();

export const useChatContext = () => useContext(ChatContext);

export const ChatContextProvider = ({ children }) => {
  const [allUsers, setallUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [reloadMessages, setReloadMessages] = useState(false); 

  // Initialize isAddedToCart from local storage
  const [isAddedToCart, setIsAddedToCart] = useState(() => {
    const saved = localStorage.getItem('isAddedToCart');
    const initialValue = JSON.parse(saved);
    return initialValue || null;
  });

  // Store isAddedToCart in local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('isAddedToCart', JSON.stringify(isAddedToCart));
  }, [isAddedToCart]);

  return (
    <ChatContext.Provider value={{ selectedUser, setSelectedUser, chats, setChats, allUsers, setallUsers, reloadMessages, setReloadMessages, isAddedToCart, setIsAddedToCart }}>
      {children}
    </ChatContext.Provider>
  );
};