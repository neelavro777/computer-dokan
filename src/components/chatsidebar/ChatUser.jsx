import React from 'react';
import { useChatContext } from '../../context/ChatContext';
import { useSocketContext } from '../../context/SocketContext';

const ChatUser = () => {
  const { allUsers, selectedUser, setSelectedUser } = useChatContext();
  const { onlineUsers } = useSocketContext();

  const handleClick = (user) => {
    setSelectedUser(user);
  };

  return allUsers.map((user) => {
    const isOnline = onlineUsers.includes(user._id);

    return (
      <div
        className={`d-flex gap-2 align-items-center rounded p-2 py-1 ${selectedUser && selectedUser._id === user._id ? 'bg-primary text-black' : ''}`}
        onClick={() => handleClick(user)}
        key={user._id}
      >
        <div className='d-flex flex-column flex-grow-1'>
          <div className='d-flex gap-3 justify-content-between align-content-center'>
            <p className='font-bold'>{user.fullName}</p>
            {isOnline && <span className="badge bg-success">Online</span>}
          </div>
        </div>
      </div>
    );
  });
};

export default ChatUser;

