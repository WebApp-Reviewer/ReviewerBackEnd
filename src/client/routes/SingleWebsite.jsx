import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleWebsite from "../components/SingleWebsite"; // Import the component
import { fetchSingleWebsite } from "../ajaxHelper"; // You may need to create this function
import "../Style/SingleWebsite.css"; // Import your CSS stylesheet

const SingleWebsiteRoute = () => {
  const { id } = useParams();
  const [singleWebsite, setSingleWebsite] = useState(null);

  useEffect(() => {
    // Fetch website details based on the id
    async function fetchDetails() {
      try {
        const result = await fetchSingleWebsite(id);
        setSingleWebsite(result.website);
      } catch (error) {
        console.error("Error fetching website details:", error);
        // Handle error or display a message to the user
      }
    }

    // Call the fetchDetails function
    fetchDetails();
  }, [id]);

  return <SingleWebsite singleWebsite={singleWebsite} />;
};

export default SingleWebsiteRoute;
