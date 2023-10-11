import { useState, useEffect } from "react"
import { fetchAllUsers } from "../ajaxHelper.js"

export default function Websites(adminLoggedIn) {
    const [users, setUsers] = useState([]);

    function renderAllUsers() {
        return users.map((user) => {
            return (
                <div key={user?.id}>
                    <h1>{user?.name}</h1>
                    <h2>{user?.username}</h2>
                    {/*add in smt to count the number of reviews each user has*/}
                </div>
            )
        })
    }

    useEffect(() => {
        async function allUsersHandler() {
            const result = await fetchAllUsers();
            setUsers(result.users);
            console.log("websites", result.users);
        } allUsersHandler();
    }, [])

    return (
        <>
        {adminLoggedIn ? (
            <div>{renderAllUsers()}</div>
        ) : (<h1>Please Login!</h1>)}
        </>
    )
}