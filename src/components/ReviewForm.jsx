import React, { useState } from 'react';
import axios from 'axios';

function ReviewForm(props) {
    const [comments, setComments] = useState('');
    const [rating, setRating] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();
        const reviewData = {
            userName: props.userName,
            userID: props.userID,
            productID:  props.productID,
            comments,
            rating: Number(rating)
        };
        try {
            // Make a POST request to your API endpoint
            const response = await axios.post('http://localhost:5000/api/product/review-product', reviewData);
    
            // Handle success response
            console.log('Review submitted successfully:', response.data);
    
            // Optionally, you can reset the form fields after successful submission
            setComments('');
            setRating('');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                // Extract the server error message
                const serverErrorMessage = error.response.data.error;
                console.error('Error submitting review:', serverErrorMessage);
            } else {
                // If the error is not a 400 status response from the server, log the entire error
                console.error('Error submitting review:', error);
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea className="form-control" placeholder="Comments" aria-label="Comments" value={comments} onChange={(e) => setComments(e.target.value)}/>
                <textarea className="form-control" type="text" placeholder="Rating" aria-label="Rating" value={rating} onChange={(e) => setRating(e.target.value)}/>
                <button className="btn btn-danger" type="submit">Post</button>
            </form>
        </div>
    );
}

export default ReviewForm;
