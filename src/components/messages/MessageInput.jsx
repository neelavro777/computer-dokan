import React, { useState } from 'react';
import { useChatContext } from '../../context/ChatContext';
import axios from 'axios';

const MessageInput = () => {
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('accessToken');
  const { selectedUser, chats, setChats } = useChatContext();
  console.log(selectedUser._id);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(message);
    await sendMessage(message);
    setMessage('');
  };

  const sendMessage = async (message) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/message/send/${selectedUser._id}`,
        { message },
        {
            headers: {
                Authorization: `Bearer ${token}`
              },
        }
      );
      const data = await res.data;
      setChats([...chats, data]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className='px-4 my-3' onSubmit={handleSubmit}>
      <div className='w-100 d-flex'>
        <input
          type='text'
          placeholder='Send a message'
          className='form-control rounded'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type='submit' className='btn btn-success ms-2'>
          send
        </button>
      </div>
    </form>
  );
};

export default MessageInput;