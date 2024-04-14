import React, { useEffect, useState } from 'react';
import axios from 'axios';


const ReviewDisplay = ({ productID }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews,setTotalReviews]=useState(0);


  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/product/get-review/${productID}` );
        console.log(response);
        setReviews(response.data);

        const totalRating = response.data.reduce((total, review) => total + review.rating, 0);
        setTotalReviews(response.data.length);
        const avgRating = totalRating / response.data.length;
        setAverageRating(avgRating);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      }
    };

    fetchReviews();
  }, [productID]);

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Reviews ({totalReviews})</h1>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Average Rating: {averageRating}</h2>
      {reviews.map((review) => (
        <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">{review.userName}</h5>
          <h6 className="card-subtitle mb-2 text-muted">Rating: {review.rating}</h6>
          <p className="card-text">{review.comments}</p>
        </div>
      </div>
      ))}
    </div>
  );
};

export default ReviewDisplay;