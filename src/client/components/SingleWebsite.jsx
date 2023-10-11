import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleWebsiteDetails from "./SingleWebsitesDetails";
import SingleWebsiteReviews from "./SingleWebsiteReviews"; // Import the component for reviews
// import ReviewButton from "../components/ReviewOrEditButton";
import { fetchSingleWebsite } from "../API/ajaxHelpers";
//import "../Style/SingleWebsite.css";

const SingleWebsitePage = () => {
  const { id } = useParams();
  const [singleWebsiteDetails, setSingleWebsiteDetails] = useState(null);

  useEffect(() => {
    // Fetch website details based on the id
    async function fetchDetails() {
      try {
        const result = await fetchSingleWebsite(id);
        setSingleWebsiteDetails(result.website);
      } catch (error) {
        console.error("Error fetching website details:", error);
        // Handle error or display a message to the user
      }
    }

    // Call the fetchDetails function
    fetchDetails();
  }, [id]);

  return (
    <div>
      <SingleWebsiteDetails singleWebsiteDetails={singleWebsiteDetails} />
      {/* <ReviewButton /> */}
      <SingleWebsiteReviews />
    </div>
  );
};

export default SingleWebsitePage;