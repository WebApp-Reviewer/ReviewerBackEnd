import React from "react";
import AdminWebsites from "../components/AdminWebsites";
import '../Style/WebsitesList.css'
import '../Style/Searchbar.css'

const AdminWebsiteListings = () => {
    return (
        <>
        <div>
            <h2 className="ListingHeader"> Welcome to the Website List</h2>
            <AdminWebsites/>
        </div>
        </>
    );
};

export default AdminWebsiteListings;