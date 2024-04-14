import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { useChatContext } from '../../context/ChatContext';
import { useSocketContext } from '../../context/SocketContext';
import { useProductContext } from '../../context/ProductContext';
import { useNavigate } from 'react-router-dom';

const RejectedMessage = ({ chat }) => {
    const Navigate = useNavigate();
    const { setproductPrice, setProduct, selectedProduct } = useProductContext();
    const { selectedUser} = useChatContext();
    const { authUser } = useAuthContext();
    const { onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(selectedUser._id);
    const fromMe = chat.senderId === authUser.userMId;
    const chatClassName = fromMe ? 'justify-content-end' : 'justify-content-start';
    const messageClass = fromMe ? 'bg-primary text-white' : 'bg-secondary text-white';
    const bubbleClass = fromMe ? 'rounded-pill start-0' : 'rounded-pill end-0';
    const senderName = fromMe ? authUser.userName : selectedUser.fullName;
    const textClass = fromMe ? 'text-end' : 'text-start';


    
    return (
        <div className={`d-flex ${chatClassName}`}>
          <div>
            <div className={`text-muted small ${textClass}`}>{senderName}</div>
            <div className={`d-inline-block rounded-pill px-3 py-2 ${messageClass} ${bubbleClass}`}>
              <div>{chat.content}</div>
              {!fromMe ? (
                <div>
                    <h1> You have Rejected this buyer's offer </h1>
                    <p>Price: {chat.offer.product.price}</p>
                    <p>Previous Offer: {chat.offer.offerAmount}</p>
                </div>
              ): (
                <div>
                    <h1> Your Offer was rejected Make a new Offer? </h1>
                    <p>Price: {chat.offer.product.price}</p>
                    <p>Previous Offer: {chat.offer.offerAmount}</p>
                
                </div>
                )
                }
            </div>
          </div>
        </div>
      );
    };

export default RejectedMessage


