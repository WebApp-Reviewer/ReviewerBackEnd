import { useState, useEffect } from "react";
import { fetchAllReviews, deleteReview } from "../API/ajaxHelpers";

export default function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [thumbsUp, setThumbsUp] = useState({});
    const [thumbsDown, setThumbsDown] = useState({});

    useEffect(() => {
        async function allReviewsHandler() {
            try {
                const result = await fetchAllReviews();
                setReviews(result.reviews);

                // Initialize the thumbs up and thumbs down state for each review
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
        setThumbsUp((prevThumbsUp) => ({
            ...prevThumbsUp,
            [reviewId]: prevThumbsUp[reviewId] + 1,
        }));
    };

    const handleThumbsDown = (reviewId) => {
        setThumbsDown((prevThumbsDown) => ({
            ...prevThumbsDown,
            [reviewId]: prevThumbsDown[reviewId] + 1,
        }));
    };

    const renderAllReviews = () => {
        return reviews.map((review) => (
            <li key={review.id}>
                <h4>{review.title}</h4>
                <p>{review.content}</p>
                <div>
                    <button onClick={() => handleThumbsUp(review.id)}>
                        Thumbs Up ({thumbsUp[review.id]})
                    </button>
                    <button onClick={() => handleThumbsDown(review.id)}>
                        Thumbs Down ({thumbsDown[review.id]})
                    </button>
                    <button onClick={() => handleDelete(review.id)}>Delete</button>
                </div>
            </li>
        ));
    };

    async function handleDelete(reviewId) {
        try {
            await deleteReview(reviewId);
            const updatedReviews = await fetchAllReviews();
            setReviews(updatedReviews.reviews);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="all-reviews">
            <ul>{renderAllReviews()}</ul>
        </div>
    );
}