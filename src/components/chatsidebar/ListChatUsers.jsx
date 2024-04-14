import React, { useEffect } from "react";
import ChatUser from './ChatUser';
import axios from 'axios';
import { useChatContext } from '../../context/ChatContext';

const ListChatUsers = () => {
  const { setallUsers } = useChatContext();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setallUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);

  return (
    <div className="py-2 d-flex flex-column overflow-auto">
      <ChatUser />
    </div>
  )
}

export default ListChatUsers;
