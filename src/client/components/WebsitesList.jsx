import React, { useState, useEffect } from "react";
import { fetchAllWebsites } from "../API/ajaxHelpers";
import { Link } from "react-router-dom";
import urlLink from "../assets/export-icon.png";

export default function WebsitesList() {
  const [websites, setWebsites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle changes in the search input
  function handleSearchInputChange(event) {
    setSearchTerm(event.target.value);
  }

  // Function to render filtered websites
  function renderAllWebsites() {
    const filteredWebsites = websites.filter((website) => {
      const lowercasedName = (website.name || "").toLowerCase();
      const lowercasedContent = (website.content || "").toLowerCase();
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      return (
        lowercasedName.includes(lowercasedSearchTerm) ||
        lowercasedContent.includes(lowercasedSearchTerm)
      );
    });

    return filteredWebsites.map((website) => {
      return (
        <div key={website?.id} className="website-container">
          <div className="singleWebsite-container">
            <Link to={`/websites/${website?.id}`}>
              <h1 className="website-name">{website?.name}</h1>
              <img
                src={website?.image}
                alt={website?.name}
                className="website-image"
              />
              <h2 className="website-description">{website?.description}</h2>
            </Link>
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
                className="website-image"
              />
            </a>
          </div>
        </div>
      );
    });
  }

  useEffect(() => {
    async function allWebsitesHandler() {
      const result = await fetchAllWebsites();
      console.log({ result });
      setWebsites(result.websites);
    }
    allWebsitesHandler();
  }, []);

  return (
    <div className="all-websites">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Websites..."
          value={searchTerm}
          onChange={handleSearchInputChange}
          className="search-input"
        />
      </div>
      <div className="Website_List">
      {renderAllWebsites()}
      </div>
    </div>
  );
}