import React from "react";
import AdminUsers from '../components/AdminUsers'
import '../Style/AdminUsers.css'

const AdminUserList = () => {
    return (
        <>
        <div>
            <h2 className="ListingHeader"> Welcome to the User List</h2>
            <AdminUsers/>
        </div>
        </>
    );
};

export default AdminUserList;