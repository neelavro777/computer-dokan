import React, { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { useChatContext } from '../../context/ChatContext';
import { useProductContext } from '../../context/ProductContext';
import useMakeOffer from '../../hooks/useMakeOffer';



const SendOffer = ({ product }) => {
  const { authUser } = useAuthContext();
  const { selectedUser } = useChatContext();
  const { selectedProduct, selectedOffer, setNewOffer } = useProductContext();
  const [offerAmount, setOfferAmount] = useState('');
  // console.log(selectedUser);

  const { status, offerData, messageData, error, makeOffer } = useMakeOffer(product?._id, offerAmount, selectedUser?._id);
  const handleSendOffer = async () => {
    await makeOffer();
    setOfferAmount('');
    setNewOffer(null);
    // console.log(messageData, offerData);
  };

  // console.log("selectedOffer",selectedOffer)

    return (
        <div className="card" style={{ width: '18rem', height: 'auto', marginBottom: '1rem' }}>
          <div className="card-body">
            <h5 className="card-title">Send an Offer</h5>
            <input 
              type="number" 
              value={offerAmount} 
              onChange={(e) => setOfferAmount(e.target.value)} 
              className="form-control mb-2" 
              placeholder="Enter your offer"
            />
            {/* <button onClick={handleSendOffer} className="btn btn-primary" disabled={!selectedProduct || selectedOffer?.offerStatus ==='declined' || selectedOffer?.offerStatus ==='accepted'}>Send Offer</button> */}
            <button onClick={handleSendOffer} className="btn btn-primary" disabled={offerAmount <= 0}>Send Offer</button>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'error' && <p>Error: {error.message}</p>}
            {status === 'success' && <p>Offer sent successfully!</p>}
          </div>
        </div>
      );
    };
    
    export default SendOffer;
