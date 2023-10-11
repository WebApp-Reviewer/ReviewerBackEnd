import { useState, useEffect } from "react"
import { deleteWebsite, fetchAllAdminWebsites } from "../ajaxHelper.js"
import urlLink from "../assets/Export Icon.png";

export default function AdminWebsites(adminLoggedIn) {
    const [websites, setWebsites] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editedWebsite, setEditedWebsite] = useState({});

    function renderAllWebsites() {
        return websites.map((website) => {
            return (
                <div key={website?.id}>
                    {isEditing && editedWebsite.id === website.id ? (
                        <div className="edit-container">
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
                            <button onClick={() => handleSaveClick(website.id)} className="save-button">Save</button>
                        </div>
                    ) : (
                        <>
                            <div className="website-container">
                            <div className="singleWebsite-container">
                            <h1 className="website-name">{website?.name}</h1>
                            <img
                                src={website?.image}
                                alt={website?.name}
                                className="website-image"
                            />
                            <h2 className="website-description">{website?.description}</h2>
                            </div>
                            <div className="smaller-container">
                            <a
                                href={website?.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="website-url"
                            >
                            <img
                                src={urlLink}
                                alt={website?.name}
                                className="website-image-2"
                            />
                            </a>
                            </div>
                            <button onClick={() => handleEditClick(website.id)} className="handle-button">Edit</button>
                            <button onClick={() => handleDelete(website.id)} className="handle-button">Delete</button>
                            </div>
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
            <div className="Website_List">
                {renderAllWebsites()}
            </div>
        ) : (<h1>Please Login!</h1>)}
        </>
    )
}