import React from "react";
import AdminCreateWebsite from '../components/AdminCreateWebsite'
import '../Style/CreateWebsite.css'

const AdminCreateWebsites = () => {
    return (
        <>
        <div>
            <h2 className="ListingHeader"> Create a new Website to add to the list</h2>
            <AdminCreateWebsite/>
        </div>
        </>
    );
};

export default AdminCreateWebsites;