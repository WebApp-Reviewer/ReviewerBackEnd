import { useState, useEffect } from "react"
//import { useParams } from "react-router-dom"
import { fetchAllUsers, fetchAllReviews } from "../API/ajaxHelpers"

export default function AdminUsers(adminLoggedIn) {
    const [users, setUsers] = useState([]);
    const [userReviewCounts, setUserReviewCounts] = useState([]);

    function renderAllUsers() {
        return users.map((user) => {
            return(
                <div key={user?.id}>
                    <h1> Name: {user?.name}</h1>
                    <h2> Username: {user?.username}</h2>
                    {/*add in smt to count the number of reviews each user has*/}
                    <p>Total Reviews: {userReviewCounts[user.id] || 0}</p>
                </div>
            )
        })
    }

    useEffect(() => {
        async function allUsersHandler() {
            const result = await fetchAllUsers();
            setUsers(result.users);
            console.log("users", result.users);
        } allUsersHandler();
    }, [])

    useEffect(() => {
        async function fetchReviewsAndFilter() {
            try {
                console.log("Fetching all reviews...");

                const allReviews = await fetchAllReviews();
                const allUsers = await fetchAllUsers();

                // Filter reviews based on authorid
                const filteredReviews = allReviews.reviews.filter(review => {
                    const author = allUsers.users.find(user => user.id === review.authorid);
                    return author !== undefined; // Only keep reviews with a matching author
                });

                // Count the number of filtered reviews for each user
                const counts = {};

                filteredReviews.forEach(review => {
                    if (counts[review.authorid]) {
                        counts[review.authorid]++;
                    } else {
                        counts[review.authorid] = 1;
                    }
                });

                console.log("User Review Counts:", counts);

                // Update userReviewCounts state
                setUserReviewCounts(counts);
            } catch(error) {
                console.log("Error fetching and filtering reviews", error);
            }
        }

        fetchReviewsAndFilter();
    }, []);

    return (
        <>
        {adminLoggedIn ? (
            <div>{renderAllUsers()}</div>
        ) : (<h1>Please Login!</h1>)}
        </>
    )
}