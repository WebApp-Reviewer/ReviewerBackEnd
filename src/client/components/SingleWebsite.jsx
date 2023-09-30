// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { fetchSingleWebsite } from "../ajaxHelper"; // You may need to create this function
// import "../Style/SingleWebsite.css"; // Import your CSS stylesheet

// export default function SingleWebsite() {
//   // Get the id parameter from the route
//   const { id } = useParams();

//   // Initialize state to store website details
//   const [singleWebsite, setSingleWebsite] = useState(null);

//   useEffect(() => {
//     // Fetch website details based on the id
//     async function fetchDetails() {
//       try {
//         const result = await fetchSingleWebsite(id);
//         setSingleWebsite(result.website);
//       } catch (error) {
//         console.error("Error fetching website details:", error);
//         // Handle error or display a message to the user
//       }
//     }

//     // Call the fetchDetails function
//     fetchDetails();
//   }, [id]);

//   return (
//     <div className="single-website-container">
//       {singleWebsite ? (
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
//       ) : (
//         <p>Loading...</p> // You can display a loading indicator while fetching data
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleWebsite } from "../ajaxHelper"; // You may need to create this function
import "../Style/SingleWebsite.css"; // Import your CSS stylesheet

export default function SingleWebsite() {
  const { id } = useParams();
  const [singleWebsite, setSingleWebsite] = useState(null);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const result = await fetchSingleWebsite(id);
        setSingleWebsite(result.website);
      } catch (error) {
        console.error("Error fetching website details:", error);
      }
    }

    fetchDetails();
  }, [id]);

  function renderContent() {
    if (singleWebsite) {
      return (
        <div>
          <div className="website-info">
            <img
              src={singleWebsite.image}
              alt={`Image for ${singleWebsite.name}`}
              className="website-icon"
            />
            <div className="website-details">
              <h1>{singleWebsite.name}</h1>
              <p className="website-description">{singleWebsite.description}</p>
            </div>
          </div>
          <a
            href={singleWebsite.url}
            target="_blank"
            rel="noopener noreferrer"
            className="website-url"
          >
            URL: {singleWebsite.url}
          </a>
        </div>
      );
    } else {
      return <p>Loading...</p>;
    }
  }

  return <div className="single-website-container">{renderContent()}</div>;
}
