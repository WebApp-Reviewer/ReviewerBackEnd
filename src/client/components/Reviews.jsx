import React, { useState, useEffect } from "react";
import { fetchAllReviews, deleteReview } from "../ajaxHelper";
import Upvote from '../assets/ThumbsUp.svg';
import Downvote from '../assets/ThumbsDown.svg';

export default function Reviews({ user, setLoggedIn }) {
    const [reviews, setReviews] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editedReview, setEditedReview] = useState({});
    const [thumbsUp, setThumbsUp] = useState({});
    const [thumbsDown, setThumbsDown] = useState({});
    const [searchQuery, setSearchQuery] = useState("");

    function renderAllReviews() {
        const filteredReviews = reviews.filter((review) =>
            review.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return filteredReviews.map((review) => {
            return (
                <div key={review?.id}>
                    {isEditing && editedReview.id == review.id ? (
                        <div className="edit-container">
                            <input 
                                type="text"
                                value={editedReview.name}
                                placeholder="Review Name"
                                onChange={(e) => 
                                    setEditedReview({
                                        ...editedReview,
                                        name: e.target.value,
                                    })
                                }
                            />
                            <input 
                                type="text"
                                value={editedReview.content}
                                placeholder="Review Description"
                                onChange={(e) => 
                                    setEditedReview({
                                        ...editedReview,
                                        content: e.target.value,
                                    })
                                }
                            />
                            <input 
                                type="text"
                                value={editedReview.rating}
                                placeholder="Rating"
                                onChange={(e) => 
                                    setEditedReview({
                                        ...editedReview,
                                        rating: e.target.value,
                                    })
                                }
                            />
                            <input 
                                type="text"
                                value={editedReview.date}
                                placeholder="Review Date"
                                onChange={(e) => 
                                    setEditedReview({
                                        ...editedReview,
                                        date: e.target.value,
                                    })
                                }
                            />
                            <button onClick={() => handleSaveClick(review.id)} className="save-button">Save</button>
                        </div>
                    ) : (
                        <>
                          <div className="reviews-container">
                            <h1  className="review-name">{review?.name}</h1>
                            <h2 className="review-content">{review?.content}</h2>
                            <h2 className="review-rating">{review?.rating}</h2>
                            <h2 className="review-date">{review?.date}</h2>
                            <div className="image-container">
                            <button onClick={() => handleThumbsUp(review.id)}>
                                <img
                                    src={Upvote}
                                    alt="Thumbs Up"
                                    className="Thumbs"
                                />
                            </button>
                            <div className="UpvoteNumber"><p>({thumbsUp[review.id]})</p></div>
                            <button onClick={() => handleThumbsDown(review.id)}>
                                <img
                                    src={Downvote}
                                    alt="Thumbs Down"
                                    className="Thumbs"
                                />
                            </button>
                            <div className="UpvoteNumber"><p>({thumbsDown[review.id]})</p></div>
                            </div>
                            <button onClick={() => handleEditClick(review.id)} className="handle-button">Edit</button>
                            <button onClick={() => handleDelete(review.id)} className="handle-button">Delete</button>
                          </div>  
                        </>
                    )}
                </div>
            )
        });
    };

    const handleEditClick = (reviewId) => {
        const reviewToEdit = reviews.find((review) => review.id === reviewId);
        setEditedReview(reviewToEdit);
        setIsEditing(true);
    }

    const handleSaveClick = (reviewId) => {
        const updatedReviews = reviews.map((review) => {
            if(review.id === reviewId) {
                return editedReview;
            } else {
                return review;
            }
        })
        setReviews(updatedReviews);
        setIsEditing(false);
    }

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
        if (!setLoggedIn) {
            // User not logged in, show a message or prevent voting
            alert("You must be logged in to vote.");
            return;
        }
    
        if (hasUserVoted(user.id, reviewId, "thumbsUp")) {
            // User has already voted, show a message or prevent voting
            alert("You have already voted on this review.");
            return;
        }
    
        setThumbsUp((prevThumbsUp) => ({
            ...prevThumbsUp,
            [reviewId]: prevThumbsUp[reviewId] + 1,
        }));
    
        // Remember that the user has voted on this review
        markUserVoted(user.id, reviewId, "thumbsUp");
    };
    
    const handleThumbsDown = (reviewId) => {
        if (!setLoggedIn) {
            // User not logged in, show a message or prevent voting
            alert("You must be logged in to vote.");
            return;
        }
    
        if (hasUserVoted(user.id, reviewId, "thumbsDown")) {
            // User has already voted, show a message or prevent voting
            alert("You have already voted on this review.");
            return;
        }
    
        setThumbsDown((prevThumbsDown) => ({
            ...prevThumbsDown,
            [reviewId]: prevThumbsDown[reviewId] + 1,
        }));
    
        // Remember that the user has voted on this review
        markUserVoted(user.id, reviewId, "thumbsDown");
    };    

    // Helper functions to check and record user votes
    function hasUserVoted(userId, reviewId, voteType) {
        const userVotes = getUserVotes();
    
        if (userVotes[userId] && userVotes[userId][reviewId]) {
            return userVotes[userId][reviewId] === voteType;
        }
    
        return false;
    }    

    function getUserVotes() {
        const storedVotes = localStorage.getItem("userVotes");
        return storedVotes ? JSON.parse(storedVotes) : {};
    }
    
    function setUserVotes(userVotes) {
        localStorage.setItem("userVotes", JSON.stringify(userVotes));
    }    

    function markUserVoted(userId, reviewId, voteType) {
        const userVotes = getUserVotes();
    
        if (!userVotes[userId]) {
            userVotes[userId] = {};
        }
    
        userVotes[userId][reviewId] = voteType;
    
        setUserVotes(userVotes);
    }    

    async function handleDelete(reviewId) {
        try {
            await deleteReview(reviewId);
            const updatedReviews = await fetchAllReviews();
            setReviews(updatedReviews);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="all-reviews">
            <div className='search-container'>
            <input
            type="text"
            placeholder="Search reviews..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            />
            </div>
            <div className="Review_List">{renderAllReviews()}</div>
        </div>
    );
}