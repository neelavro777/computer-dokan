import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { useChatContext } from '../../context/ChatContext';
import { useSocketContext } from '../../context/SocketContext';
import { useProductContext } from '../../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import useAcceptOffer from '../../hooks/useAcceptOffer';
import useDeclineOffer from '../../hooks/useDeclineOffer';

const OfferMessage = ({ chat }) => {
  const Navigate = useNavigate();
  const { setproductPrice, setProduct, selectedProduct } = useProductContext();
  const { selectedChat, selectedUser, reloadMessages, setReloadMessages} = useChatContext();
  const { acceptOffer, data } = useAcceptOffer(chat.offer._id);
  const { declineOffer, declineDetails  } = useDeclineOffer(chat.offer._id);
  const { authUser } = useAuthContext();
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(selectedUser._id);
  const fromMe = chat.senderId === authUser.userMId;
  const chatClassName = fromMe ? 'justify-content-end' : 'justify-content-start';
  const messageClass = fromMe ? 'bg-primary text-white' : 'bg-secondary text-white';
  const bubbleClass = fromMe ? 'rounded-pill start-0' : 'rounded-pill end-0';
  const senderName = fromMe ? authUser.userName : selectedUser.fullName;
  const textClass = fromMe ? 'text-end' : 'text-start';

  // const handleAccept = async () => {
  //   if (authUser.userType === 'seller') {
  //     await acceptOffer();
  //     console.log("Accepted Offer Details: ",data);
      

      
  //   } else {
  //     await declineOffer();
  //     console.log("Declined offer details: ",declineDetails);
  //     // console.log(data);
  //     // handle accept offer logic here
  //   }
    
  // };

  // const handleDecline = () => {
  //   // handle decline offer logic here
  // };

  const handleAccept = async () => {
    await acceptOffer();
    console.log("Accepted Offer Details: ", data);
    setReloadMessages(true);
  }

  const handleDecline = async () => {
    await declineOffer();
    console.log("Declined offer details: ", declineDetails);
    setReloadMessages(true);
  }

  return (
    <div className={`d-flex ${chatClassName}`}>
      <div>
        <div className={`text-muted small ${textClass}`}>{senderName}</div>
        <div className={`d-inline-block rounded-pill px-3 py-2 ${messageClass} ${bubbleClass}`}>
          <div>{chat.content}</div>
          <div>Name of the product that you are making an Offer On{chat.offer.product.product}</div>
          <div>Price that you are offering: {chat.offer.offerAmount}</div>
          <div>Price Posted By the seller: {chat.offer.product.price}</div>
          {!fromMe && (
            <div>
              <button onClick={handleAccept}>Accept</button>
              <button onClick={handleDecline}>Decline</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfferMessage;
