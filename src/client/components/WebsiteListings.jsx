import React from "react";
import WebsitesList from "./WebsitesList";
import "../style/WebsitesList.css"
import "../style/SearchBar.css"


const WebsiteListings = () => {
    return (
        <div>
            <h2> Welcome to the Website List</h2>
            <WebsitesList/>
        </div>
    );
};

export default WebsiteListings;