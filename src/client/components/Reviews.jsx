import React, { useState, useEffect } from "react";
import { fetchAllReviews } from "../ajaxHelper.js";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle changes in the search input
  function handleSearchInputChange(event) {
    setSearchTerm(event.target.value);
  }

  // Function to render filtered reviews
  function renderAllReviews() {
    const filteredReviews = reviews.filter((review) => {
      const lowercasedName = review.name.toLowerCase();
      const lowercasedContent = review.content.toLowerCase();
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      return (
        lowercasedName.includes(lowercasedSearchTerm) ||
        lowercasedContent.includes(lowercasedSearchTerm)
      );
    });

    return filteredReviews.map((review) => {
      return (
        <div key={review?.id} className="reviews-container">
          <h1 className="review-name">{review?.name}</h1>
          <h3 className="review-content">{review?.content}</h3>
          <h3 className="review-rating">{review?.rating}</h3>
          <h3 className="review-date">{review?.date}</h3>
        </div>
      );
    });
  }

  useEffect(() => {
    async function allReviewsHandler() {
      const result = await fetchAllReviews();
      console.log({ result });
      setReviews(result.reviews);
    }
    allReviewsHandler();
  }, []);

  return (
    <div className="all-reviews">
      <div className='search-container'>
      <input
        type="text"
        placeholder="Search reviews..."
        value={searchTerm}
        onChange={handleSearchInputChange}
      />
      </div>
      {renderAllReviews()}
    </div>
    
  );
}