import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { useChatContext } from '../../context/ChatContext';

const Message = ({ chat  }) => {
  const { selectedUser } = useChatContext();
  const { authUser } = useAuthContext();
  // const isOnline = onlineUsers.includes(selectedUser._id);
  const fromMe = chat.senderId === authUser.userMId;
  const chatClassName = fromMe ? 'justify-content-end' : 'justify-content-start';
  const messageClass = fromMe ? 'bg-primary text-white' : 'bg-secondary text-white';
  const bubbleClass = fromMe ? 'rounded-pill start-0' : 'rounded-pill end-0';
  const senderName = fromMe ? authUser.userName : selectedUser.fullName;
  const textClass = fromMe ? 'text-end' : 'text-start';
  // console.log(selectedProduct)



  return (
    <div className={`d-flex ${chatClassName}`}>
      <div>
        <div className={`text-muted small ${textClass}`}>{senderName}</div>
        <div className={`d-inline-block rounded-pill px-3 py-2 ${messageClass} ${bubbleClass}`}>
              <div>{chat.content}</div>
        </div>
      </div>
    </div>
  );
};

export default Message;