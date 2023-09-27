import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Reviews.css";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  function renderAllReviews() {
    return reviews.map((review) => {
      return (
        <div key={review._id} className="eachReview">
          <h2 className="reviewTitle">{reviews.title}</h2>
          <h4 className="reviewDescription">{reviews.description}</h4>
          <h4 className="reviewPrice">{reviews.price}</h4>
          <h4 className="reviewLocation">{reviews.location}</h4>
          <h4 className="reviewDeliver">{reviews.willDeliver}</h4>
          <button
            className="reviewButton"
            onClick={() => handleDelete(review._id)}
          >
            Delete
          </button>
          <button
            className="reviewButton"
            onClick={() => navigate("/sendmessage")}
          >
            Send Message
          </button>
        </div>
      );
    });
  }

  useEffect(() => {
    async function allReviewsHandler() {
      const result = await fetchReviews();
      setReviews(result.data.reviews);
    }
    allReviewsHandler();
  }, []);

  async function handleDelete(reviewId) {
    try {
      await deleteReview(reviewId);
      const updatedReviews = await fetchReviews();
      setReviews(updatedReviews.data.reviews);
    } catch (error) {
      console.error(error);
    }
  }

  return <div className="allPosts">{renderAllReviews()}</div>;
}

export default Reviews;