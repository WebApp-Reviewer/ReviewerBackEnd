import { useState, useEffect } from "react"
import { deleteWebsite, fetchAllWebsites } from "../API/ajaxHelpers"

export default function Websites() {
    const [websites, setWebsites] = useState([]);

    function renderAllWebsites() {
        return websites.map((website) => {
            return (
                <div key={website?.id}>
                    <h1>{website?.name}</h1>
                    <h2>{website?.description}</h2>
                    <h2>{website?.url}</h2>
                    <h2>{website?.image}</h2>
                    <button>Edit</button>
                    <button onClick={() => handleDelete(website.id)}>Delete</button>
                </div>
            )
        })
    }

    useEffect(() => {
        async function allWebsitesHandler() {
            const result = await fetchAllWebsites();
            setWebsites(result.websites);
            console.log("websites", result.websites);
        } allWebsitesHandler();
    })

    async function handleDelete(websiteId) {
        try {
            await deleteWebsite(websiteId);
            const updatedWebsites = await fetchAllWebsites();
            setWebsites(updatedWebsites.websites);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            {renderAllWebsites()}
        </div>
    )
}