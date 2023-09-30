import { useState, useEffect } from "react"
import { fetchAllUsers } from "../API/ajaxHelpers"

export default function Websites() {
    const [users, setUsers] = useState([]);

    function renderAllUsers() {
        return users.map((user) => {
            return (
                <div key={user?.id}>
                    <h1>{user?.name}</h1>
                    <h2>{user?.username}</h2>
                    {/*add in smt to count the number*/}
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
    })

    return (
        <div>
            {renderAllUsers()}
        </div>
    )
}