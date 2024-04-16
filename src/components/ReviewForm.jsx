import React, { useState } from 'react';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import {toast} from 'react-toastify';

function ReviewForm(props) {
    const [comments, setComments] = useState('');
    const [rating, setRating] = useState(0);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const reviewData = {
            userName: props.userName,
            userID: props.userID,
            productID:  props.productID,
            comments,
            rating
        };
        try {
            const response = await axios.post('http://localhost:5000/api/product/review-product', reviewData);
            console.log('Review submitted successfully:', response.data);
            setComments('');
            setRating(0);
        } catch (error) {
            toast.error('You have already reviewed this product!');
            console.error('Error submitting review:', error);
        }
    };

    return (

        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <textarea
                                        className="form-control"
                                        placeholder="Comments"
                                        aria-label="Comments"
                                        style={{ marginBottom: '10px' }}
                                        value={comments}
                                        onChange={(e) => setComments(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <StarRatings
                                        rating={rating}
                                        starRatedColor="gold"
                                        changeRating={(newRating) => setRating(newRating)}
                                        numberOfStars={5}
                                        name='rating'
                                    />
                                </div>
                                <button
                                    className="btn btn-danger"
                                    type="submit"
                                    style={{ width: '100%' }}
                                >
                                    Post
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ReviewForm;
