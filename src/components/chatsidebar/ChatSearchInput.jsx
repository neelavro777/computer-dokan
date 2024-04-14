import React, { useState, useEffect } from 'react';
import { useChatContext } from '../../context/ChatContext';
import axios from 'axios';

const ChatSearchInput = () => {
  const [search, setSearch] = useState('');
  const { setallUsers } = useChatContext();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users${search ? `?search=${search}` : ''}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        const data = await res.data;
        setallUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    const timeoutId = setTimeout(fetchUsers, 500);
    return () => clearTimeout(timeoutId);
  }, [search, setallUsers]);

  return (
    <div className='d-flex align-items-center justify-content-between'>
      <input 
        type="text" 
        placeholder="Search" 
        className="form-control" 
        value={search}
        onChange={handleChange}
      />
    </div>
  );
}

export default ChatSearchInput;