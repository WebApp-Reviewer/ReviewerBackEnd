import { useState, useEffect } from "react"
import { deleteWebsite, fetchAllAdminWebsites } from "../API/ajaxHelpers"

export default function AdminWebsites(adminLoggedIn) {
    const [websites, setWebsites] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    function renderAllWebsites() {
        return websites.map((website) => {
            return (
                <div key={website?.id}>
                    <h1>{website?.name}</h1>
                    <h2>{website?.description}</h2>
                    <h2>{website?.url}</h2>
                    <h2>{website?.image}</h2>
                    <button onClick={() => handleEditClick(website.id)}>Edit</button>
                    <button onClick={() => handleDelete(website.id)}>Delete</button>
                </div>
            )
        })
    }

    useEffect(() => {
        async function allWebsitesHandler() {
            const result = await fetchAllAdminWebsites();
            setWebsites(result.admin);
        } allWebsitesHandler();
    }, [])

    async function handleDelete(websiteId) {
        try {
            await deleteWebsite(websiteId);
            const updatedWebsites = await fetchAllAdminWebsites();
            setWebsites(updatedWebsites.admin);
        } catch (error) {
            console.error(error);
        }
    }

    const handleEditClick = () => {
        setIsEditing(true);
    }

    const handleSaveClick = () => {
        //save edited content to db
        console.log("Edited content:", websites);
        //Exit editing mode
        setIsEditing(false);
    }

    return (
        <>
        {adminLoggedIn ? (
            <div>
                {renderAllWebsites()}
                <div>
                    {isEditing ? (
                        <div>
                            <textarea 
                            value={websites}
                            onChange={(e) => setWebsites(e.target.value)}/>
                            <button onClick={handleSaveClick}>Save</button>
                        </div>
                        
                    ) : (
                        <div>
                            <p>{websites}</p>
                            <button onClick={handleEditClick}>Edit</button>
                        </div>
                    )}
                </div>
            </div>
        ) : (<h1>Please Login!</h1>)}
        </>
    )
}