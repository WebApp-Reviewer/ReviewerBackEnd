import React, { useState, useEffect } from "react";
import { fetchAllReviews } from "../ajaxHelper";
import jwt_decode from "jwt-decode"; // Make sure to import jwt_decode
import Upvote from '../assets/ThumbsUp.svg'
import Downvote from '../assets/ThumbsDown.svg'

export default function Reviews(user, setLoggedIn) {
  const [reviews, setReviews] = useState([]);
  const [thumbsUp, setThumbsUp] = useState({});
  const [thumbsDown, setThumbsDown] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function allReviewsHandler() {
      try {
        const result = await fetchAllReviews();
        setReviews(result.reviews);

        const initialThumbsUpState = {};
        const initialThumbsDownState = {};

        result.reviews.forEach((review) => {
          initialThumbsUpState[review.id] = 0;
          initialThumbsDownState[review.id] = 0;
        });

        setThumbsUp(initialThumbsUpState);
        setThumbsDown(initialThumbsDownState);
      } catch (error) {
        console.error(error);
      }
    }
    allReviewsHandler();
  }, []);

  const handleThumbsUp = (reviewId) => {
    if (!setLoggedIn) {
      alert("You must be logged in to vote.");
      return;
    }

    if (hasUserVoted(user.id, reviewId, "thumbsUp")) {
      alert("You have already voted on this review.");
      return;
    }

    setThumbsUp((prevThumbsUp) => ({
      ...prevThumbsUp,
      [reviewId]: prevThumbsUp[reviewId] + 1,
    }));

    markUserVoted(user.id, reviewId, "thumbsUp");
  };

  const handleThumbsDown = (reviewId) => {
    if (!setLoggedIn) {
      alert("You must be logged in to vote.");
      return;
    }

    if (hasUserVoted(user.id, reviewId, "thumbsDown")) {
      alert("You have already voted on this review.");
      return;
    }

    setThumbsDown((prevThumbsDown) => ({
      ...prevThumbsDown,
      [reviewId]: prevThumbsDown[reviewId] + 1,
    }));

    markUserVoted(user.id, reviewId, "thumbsDown");
  };

  function hasUserVoted(userId, reviewId, voteType) {
    const userVotes = JSON.parse(localStorage.getItem("userVotes")) || {};

    if (userVotes[userId] && userVotes[userId][reviewId]) {
      return userVotes[userId][reviewId] === voteType;
    }

    return false;
  }

  function markUserVoted(userId, reviewId, voteType) {
    const userVotes = JSON.parse(localStorage.getItem("userVotes")) || {};

    if (!userVotes[userId]) {
      userVotes[userId] = {};
    }

    userVotes[userId][reviewId] = voteType;

    localStorage.setItem("userVotes", JSON.stringify(userVotes));
  }

  const renderAllReviews = () => {
    const filteredReviews = reviews.filter((review) =>
      review.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filteredReviews.map((review) => (
      <div key={review.id} className="reviews-container">
        <h1 className="review-name">{review.name}</h1>
        <h3 className="review-content">{review.content}</h3>
        <h3 className="review-rating">{review.rating}</h3>
        <p>Date: {new Date(review.date).toLocaleDateString()}</p>
        <div className="image-container">
          <button onClick={() => handleThumbsUp(review.id)}>
            <img src={Upvote} alt="Thumbs Up" className="ThumbsUp" />
          </button>
          <div className="UpvoteNumber">
            <p>({thumbsUp[review.id]})</p>
          </div>
          <button onClick={() => handleThumbsDown(review.id)}>
            <img src={Downvote} alt="Thumbs Down" className="ThumbsDown" />
          </button>
          <div className="UpvoteNumber">
            <p>({thumbsDown[review.id]})</p>
          </div>
        </div>
      </div>
    ));
  };

  

  return (
    <div className="all-reviews">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search reviews"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="Review_List">{renderAllReviews()}</div>
    </div>
  );
}
