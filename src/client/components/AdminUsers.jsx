import { useState, useEffect } from "react"
import { fetchAllUsers } from "../ajaxHelper.js"

export default function AdminUsers( adminLoggedIn ) {
    const [users, setUsers] = useState([]);

    function renderAllUsers() {
        return users.map((user) => (
            <div key={user?.id} className="user-card">
                <h1>{user?.name}</h1>
                <h2>Username: {user?.username}</h2>
                {/* Add in smt to count the number of reviews each user has */}
            </div>
        ));
    }

    useEffect(() => {
        async function allUsersHandler() {
            const result = await fetchAllUsers();
            setUsers(result.users);
            console.log("websites", result.users);
        }
        allUsersHandler();
    }, []);

    return (
        <>
            {adminLoggedIn ? (
                <div className="admin-users-container">
                    {renderAllUsers()}
                </div>
            ) : (
                <h1 className="PleaseLogin">Please Login!</h1>
            )}
        </>
    );
}