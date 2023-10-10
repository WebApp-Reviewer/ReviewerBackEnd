import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchAllReviews } from "../ajaxHelper"; // Import the function to fetch all reviews

function ReviewButton() {
  const { id } = useParams();
  const [userReview, setUserReview] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch all reviews for this website
    async function fetchAllReviewsData() {
      try {
        const allReviews = await fetchAllReviews(); // Implement this API function
        setReviews(allReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }
    fetchAllReviewsData();
  }, []);

  useEffect(() => {
    // Check if the user's authorid matches any existing review's authorid
    if (reviews.length > 0) {
      const matchingReview = reviews.find((review) => review.authorid === userReview.authorid);
      setUserReview(matchingReview);
    }
  }, [reviews, userReview]);

  return (
    <div>
      {userReview ? (
        <button onClick={() => history.push(`/websites/${id}/edit-review`)}>
          Edit Review
        </button>
      ) : (
        <button onClick={() => history.push(`/websites/${id}/post-review`)}>
          Post Review
        </button>
      )}
    </div>
  );
}

export default ReviewButton;
