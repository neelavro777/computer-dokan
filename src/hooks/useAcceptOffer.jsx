import React, {useState} from 'react'
import axios from 'axios';

const useAcceptOffer = (offerId) => {
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const acceptOffer = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/api/offer/accept-offer/${offerId}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const offerData = await response.data;
            setData(offerData);
            setStatus('success');
        } catch (error) {
            setError(error);
            console.error(error);
        }
    }
    return {acceptOffer, status, error, data};

}

export default useAcceptOffer
