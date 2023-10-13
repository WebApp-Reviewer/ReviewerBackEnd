import React from "react";
import Reviews from "../components/Reviews";
import '../Style/Reviews.css'
import '../Style/Searchbar.css'

const ReviewList = () => {
    return (
        <div>
            <h2 className="ListingHeader"> Welcome to the Reviews</h2>
            <Reviews />
        </div>
    );
};

export default ReviewList;