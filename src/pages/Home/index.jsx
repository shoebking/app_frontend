import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import FeedbackForm from "../../components/FeedbackForm";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Home(userDetails) {
  const user = userDetails.user;

  const logout = () => {
    window.open('http://localhost:8080/auth/logout', "_self");
  };

  const [fill, setFill] = useState(false);

  const check = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/feedback/get');

      // Log emails from every feedback object in the response

      // Check if the response contains feedback data for the user's email
      const hasFeedback = response.data.feedbackData.some(feedback => feedback.email === user.email);

      // Update the fill state based on whether feedback data exists for the user
      setFill(hasFeedback);

      // Log a message when the check function is executed
      console.log('Check function executed');
    } catch (error) {
      console.error('Error checking feedback data:', error.message);
    }
  };

  useEffect(() => {
    // Call the check function when the component mounts or when user.email changes
    check();
  }, [user.email]);

  return (
    <div>
		{fill ? <Navigate to="/showDetails" /> : <FeedbackForm email={user.email} />}
      
      <button className={styles.btn} onClick={logout}>
        Log Out
      </button>
      <button>
        <Link to="/showDetails">Show Details</Link>
      </button>
    </div>
  );
}

export default Home;
