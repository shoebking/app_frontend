import React, { useState } from 'react';
import RatingStars from 'react-rating-stars-component';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const FeedbackForm = ({ email }) => {
  const [ratings, setRatings] = useState({
    'Product Features': 0,
    'Product Pricing': 0,
    'Product Usability': 0,
  });
  const [comments, setComments] = useState('');
  const navigate = useNavigate();

  const handleRatingChange = (rating, category) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [category]: rating,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Prepare feedback data
      const feedbackData = {
        email,
        category: Object.keys(ratings),
        rating: Object.values(ratings).map(Number), // Convert ratings to numbers
        comments,
      };
      console.log(feedbackData);
      // Make a POST request to the backend
      const response = await axios.post('http://localhost:8080/api/feedback', feedbackData);

      // Handle success, e.g., show a confirmation
      console.log(response.data.message);

      // Clear the form after submission
      setRatings({
        'Product Features': 0,
        'Product Pricing': 0,
        'Product Usability': 0,
      });
      setComments('');

      // Navigate to "/showDetails"
      navigate("/showDetails");
    } catch (error) {
      console.error('Feedback submission failed:', error.message);
    }
  };

  return (
    <div>
      <h2>Provide Feedback</h2>
      <div><h3>Email: {email}</h3></div>
      {Object.entries(ratings).map(([category, rating]) => (
        <div key={category} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <p style={{ marginRight: '10px' }}>{category}</p>
          <RatingStars
            count={5}
            size={24}
            onChange={(newRating) => handleRatingChange(newRating, category)}
            value={rating}
          />
        </div>
      ))}
      <div>
        <p>Comments</p>
        <textarea
          rows="4"
          cols="50"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit}>Submit Feedback</button>
    </div>
  );
};

export default FeedbackForm;
