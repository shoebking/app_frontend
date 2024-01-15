// FeedbackDisplay.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FeedbackDisplay.css'; // Import the CSS file

const FeedbackDisplay = (props) => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [avgProductFeatures, setAvgProductFeatures] = useState(0);
  const [avgProductPricing, setAvgProductPricing] = useState(0);
  const [avgProductUsability, setAvgProductUsability] = useState(0);
  const [userRatings, setUserRatings] = useState({
    'Product Features': 0,
    'Product Pricing': 0,
    'Product Usability': 0,
  });

  const logout = () => {
    window.open('http://localhost:8080/auth/logout', "_self");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = props.email;
        const response = await axios.get('http://localhost:8080/api/feedback/get');
        setFeedbackData(response.data.feedbackData);

        // Calculate and set average ratings
        setAvgProductFeatures(calculateAverageRating('Product Features', response.data.feedbackData));
        setAvgProductPricing(calculateAverageRating('Product Pricing', response.data.feedbackData));
        setAvgProductUsability(calculateAverageRating('Product Usability', response.data.feedbackData));

        // Find and set user ratings
        const userFeedback = response.data.feedbackData.find(feedback => feedback.email === email);
        if (userFeedback) {
          setUserRatings({
            'Product Features': userFeedback.rating[0],
            'Product Pricing': userFeedback.rating[1],
            'Product Usability': userFeedback.rating[2],
          });
        }
      } catch (error) {
        console.error('Error fetching feedback data:', error.message);
      }
    };

    fetchData();
  }, [props.email]);

  const calculateAverageRating = (category, data) => {
    const categoryFeedback = data.filter((feedback) => feedback.category.includes(category));
    if (categoryFeedback.length === 0) {
      return 0; // Default value if no feedback for the category
    }

    const totalRating = categoryFeedback.reduce((sum, feedback) => sum + feedback.rating[categoryFeedback[0].category.indexOf(category)], 0);
    return totalRating / categoryFeedback.length;
  };

  return (
    <div className="container">
      <h2>Feedback Display</h2>
      <div className="category-container">
        <p className="category-title">Category: Product Features</p>
        <p className="average-rating">Average Rating: {avgProductFeatures}</p>
        <p className="user-rating">Your Rating: {userRatings['Product Features']}</p>
        <hr />
      </div>
      <div className="category-container">
        <p className="category-title">Category: Product Pricing</p>
        <p className="average-rating">Average Rating: {avgProductPricing}</p>
        <p className="user-rating">Your Rating: {userRatings['Product Pricing']}</p>
        <hr />
      </div>
      <div className="category-container">
        <p className="category-title">Category: Product Usability</p>
        <p className="average-rating">Average Rating: {avgProductUsability}</p>
        <p className="user-rating">Your Rating: {userRatings['Product Usability']}</p>
        <hr />
      </div>
      <button className="logout-button" onClick={logout}>
        Log Out
      </button>
    </div>
  );
};

export default FeedbackDisplay;
