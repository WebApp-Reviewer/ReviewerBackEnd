// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { fetchSingleWebsite } from "../ajaxHelper"; // You may need to create this function
// import "../Style/SingleWebsite.css"; // Import your CSS stylesheet

// export default function SingleWebsite() {
//   const { id } = useParams();
//   const [singleWebsite, setSingleWebsite] = useState(null);

//   useEffect(() => {
//     async function fetchDetails() {
//       try {
//         const result = await fetchSingleWebsite(id);
//         setSingleWebsite(result.website);
//       } catch (error) {
//         console.error("Error fetching website details:", error);
//       }
//     }

//     fetchDetails();
//   }, [id]);

//   function renderContent() {
//     if (singleWebsite) {
//       return (
//         <div>
//           <div className="website-info">
//             <img
//               src={singleWebsite.image}
//               alt={`Image for ${singleWebsite.name}`}
//               className="website-icon"
//             />
//             <div className="website-details">
//               <h1>{singleWebsite.name}</h1>
//               <p className="website-description">{singleWebsite.description}</p>
//             </div>
//           </div>
//           <a
//             href={singleWebsite.url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="website-url"
//           >
//             URL: {singleWebsite.url}
//           </a>
//         </div>
//       );
//     } else {
//       return <p>Loading...</p>;
//     }
//   }

//   return <div className="single-website-container">{renderContent()}</div>;
// }

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleWebsite, fetchReviewsForWebsite } from "../ajaxHelper";
import "../Style/SingleWebsite.css";

export default function SingleWebsite() {
    const { id } = useParams();
    const [website, setWebsite] = useState({});
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch website details
                const websiteData = await fetchSingleWebsite(id);
                setWebsite(websiteData);

                // Fetch reviews for the website
                const reviewsData = await fetchReviewsForWebsite(id);
                setReviews(reviewsData);
            } catch (error) {
                console.error("Error fetching website and reviews:", error);
            }
        }
        fetchData();
    }, [id]);

    return (
        <div className="single-website">
            <div className="website-info">
                <img
                    className="website-image"
                    src={website.image}
                    alt={`Image for ${website.name}`}
                />
                <div className="website-details">
                    <h1 className="website-name">{website.name}</h1>
                    <p className="website-description">{website.description}</p>
                    <a
                        className="website-url"
                        href={website.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        URL: {website.url}
                    </a>
                </div>
            </div>

            {reviews && reviews.length > 0 ? (
                <div>
                    <h2 className="reviews-title">Reviews:</h2>
                    <ul className="reviews-list">
                        {reviews.map((review) => (
                            <li key={review.id} className="review-item">
                                <h3>{review.name}</h3>
                                <p>{review.content}</p>
                                <p>Rating: {review.rating}</p>
                                <p>Date: {new Date(review.date).toLocaleDateString()}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No reviews available for this website.</p>
            )}
        </div>
    );
}
