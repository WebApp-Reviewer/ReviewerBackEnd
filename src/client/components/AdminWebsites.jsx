import { useState, useEffect } from "react"
import { deleteWebsite, fetchAllAdminWebsites } from "../API/ajaxHelpers"
import "../style/WebsitesList.css"
import "../style/SearchBar.css"

export default function AdminWebsites(adminLoggedIn) {
    const [websites, setWebsites] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editedWebsite, setEditedWebsite] = useState({});

    function renderAllWebsites() {
        return websites.map((website) => {
            return (
                <div key={website?.id}>
                    {isEditing && editedWebsite.id === website.id ? (
                        <div>
                            <input
                                type="text"
                                value={editedWebsite.name}
                                onChange={(e) =>
                                    setEditedWebsite({
                                        ...editedWebsite,
                                        name: e.target.value,
                                    })
                                }
                            />
                            <input
                                type="text"
                                value={editedWebsite.description}
                                onChange={(e) =>
                                    setEditedWebsite({
                                        ...editedWebsite,
                                        description: e.target.value,
                                    })
                                }
                            />
                            <input
                                type="text"
                                value={editedWebsite.url}
                                onChange={(e) =>
                                    setEditedWebsite({
                                        ...editedWebsite,
                                        url: e.target.value,
                                    })
                                }
                            />
                            <input
                                type="text"
                                value={editedWebsite.image}
                                onChange={(e) =>
                                    setEditedWebsite({
                                        ...editedWebsite,
                                        image: e.target.value,
                                    })
                                }
                            />
                            <button onClick={() => handleSaveClick(website.id)}>Save</button>
                        </div>
                    ) : (
                        <>
                            <h1>{website?.name}</h1>
                            <h2>{website?.description}</h2>
                            <h2>{website?.url}</h2>
                            <h2>{website?.image}</h2>
                            <button onClick={() => handleEditClick(website.id)}>Edit</button>
                            <button onClick={() => handleDelete(website.id)}>Delete</button>
                        </>
                    )}
                </div>
            );
        });
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

    const handleEditClick = (websiteId) => {
        const websiteToEdit = websites.find((website) => website.id === websiteId);
        setEditedWebsite(websiteToEdit);
        setIsEditing(true);
    }

    const handleSaveClick = (websiteId) => {
        const updatedWebsites = websites.map((website) => {
            if(website.id === websiteId) {
                return editedWebsite;
            } else {
                return website;
            }
        })
        setWebsites(updatedWebsites);
        setIsEditing(false);
    }

    return (
        <>
        {adminLoggedIn ? (
            <div>
                {renderAllWebsites()}
            </div>
        ) : (<h1>Please Login!</h1>)}
        </>
    )
}