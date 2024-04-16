import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StarRatings from 'react-star-ratings';

const ReviewDisplay = ({ productID }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/product/get-review/${productID}`);
        console.log(response);
        setReviews(response.data);

        if (response.data.length === 0) {
          setAverageRating(0);
        } else {
          const totalRating = response.data.reduce((total, review) => total + review.rating, 0);
          const avgRating = totalRating / response.data.length;
          setAverageRating(avgRating);
        }
        
        setTotalReviews(response.data.length);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      }
    };

    fetchReviews();
  }, [productID]);

  return (
    <div>
      <div className='px-3 border rounded' style={{backgroundColor:'white',padding:'10px',marginBottom:'10px'}}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Reviews ({totalReviews})</h1>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Average Rating: 
          <StarRatings
            rating={averageRating}
            starRatedColor="gold"
            numberOfStars={5}
            starDimension="20px"
            starSpacing="2px"
          />
        </h2>
      </div>
      {reviews.map((review) => (
        <div className="card mb-3" key={review._id}>
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="card-title mb-0">{review.userName}</h5>
              <p className="text-muted mb-0">Date: {new Date(review.postedAt).toLocaleDateString()}</p>
            </div>
            <h6 className="card-subtitle mb-2 text-muted">
              <StarRatings
                rating={review.rating}
                starRatedColor="gold"
                numberOfStars={5}
                starDimension="20px"
                starSpacing="2px"
              />
            </h6>
            <p className="card-text">{review.comments}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewDisplay;
