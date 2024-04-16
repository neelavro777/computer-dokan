import React, {useState} from 'react'
import { useChatContext } from '../context/ChatContext';
import { useProductContext } from '../context/ProductContext';
import { useSocketContext } from '../context/SocketContext';
import axios from 'axios';


const useMakeOffer = (productID, offeredAmount, receiverId) => {
    const { socket } = useSocketContext();
    const { chats, setChats } = useChatContext();
    const {  setOffers, offers } = useProductContext();
    const token = localStorage.getItem('accessToken');
    // const { authUser } = useAuthContext();
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState(null);
    // const [data, setData] = useState(null);
    const [messageData, setMessageData] = useState(null);
    const [offerData, setOfferData] = useState(null);
    
    const makeOffer = async () => {
        setStatus('loading');
        try {
            const offerRes = await axios.post(
                `http://localhost:5000/api/offer/make-offer/${productID}`,
                { price: offeredAmount, sellerId: receiverId},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            // const { data: { newOffer, newMessage } } = await offerRes.data;
            const responseData = await offerRes.data;
            // console.log(newMessage);
            console.log(responseData.data);
            setChats([...chats, responseData.data.newMessage]);
            // setOffers([...offers, responseData.data.newOffer]);
            setMessageData(responseData.data.newMessage);
            setOfferData(responseData.data.newOffer);
            setStatus('success');
        } catch (error) {
            setError(error);
            setStatus('error');
        }
    };

  return { makeOffer, status, error, offerData, messageData };
}

export default useMakeOffer;

