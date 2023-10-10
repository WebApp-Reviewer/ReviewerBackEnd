import React from "react";
import WebsitesList from "../components/WebsitesList";
import '../Style/WebsitesList.css'
import '../Style/Searchbar.css'

const WebsiteListings = () => {
    return (
        <>
        <div>
            <h2 className="ListingHeader"> Welcome to the Website List</h2>
            <WebsitesList/>
        </div>
        </>
    );
};

export default WebsiteListings;