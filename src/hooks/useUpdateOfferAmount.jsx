import React from 'react';
import axios from 'axios';

const useUpdateOfferAmount = (offerAmount, offerInfo) => {
    const [offer, setOffer] = useState(offerAmount);

    const updateOfferAmount = async (offerAmount) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/offer/update-offer/${offer._id}`, {
                offerAmount
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            setOffer(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    return { offer, updateOfferAmount };
}

export default useUpdateOfferAmount;
