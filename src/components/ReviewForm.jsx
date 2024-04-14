import React, { useState } from 'react';
import axios from 'axios';

function ReviewForm(prompt) {
    const [comments, setComments] = useState('');
    const [rating, setRating] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('comments', comments);
        formData.append('rating', rating);
        formData.append('productID', prompt.productID);
        formData.append('userID', prompt.userID);
        formData.append('userName', prompt.userName);
        try {
            // Make a POST request to your API endpoint
            const response = await axios.post("http://localhost:5000/api/auth/review", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Handle success response
            console.log('Review submitted successfully:', response.data);

            // Optionally, you can reset the form fields after successful submission
            setComments('');
            setRating('');
        } catch (error) {
            // Handle error
            console.error('Error submitting review:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Comments:
                    <textarea value={comments} onChange={e => setComments(e.target.value)} required />
                </label>
                <label>
                    Rating:
                    <input type="number" min="1" max="5" value={rating} onChange={e => setRating(e.target.value)} required />
                </label>
                <input type="submit" value="Submit Review" />
            </form>
        </div>
    );
}

export default ReviewForm;
