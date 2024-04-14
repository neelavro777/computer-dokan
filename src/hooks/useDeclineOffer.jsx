import React, { useState } from 'react'
import axios from 'axios';

const useDeclineOffer = (offerID) => {
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState(null);
    const [declineDetails, setDeclineDetails] = useState(null);
    const token = localStorage.getItem('accessToken');
    const declineOffer = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/api/offer/decline-offer/${offerID}`,{}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.data;
            setDeclineDetails(data);
            setStatus('success');
        } catch (error) {
            setError(error);
            console.error(error);
        }
    }
    return {declineOffer, status, error, declineDetails};
}

export default useDeclineOffer
