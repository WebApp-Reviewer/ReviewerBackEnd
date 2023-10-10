import { useState, useEffect } from "react"
import { fetchAllWebsites } from "../API/ajaxHelpers"

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
                </div>
            )
        })
    }

    useEffect(() => {
        async function allWebsitesHandler() {
            try {
                const result = await fetchAllWebsites();
                setWebsites(result.websites);
                console.log("websites", result.websites);
            } catch (error) {
                console.error("Error fetching websites:", error);
            }
        }
        allWebsitesHandler();
    }, []);

    return (
        <div>
            {renderAllWebsites()}
        </div>
    )
}