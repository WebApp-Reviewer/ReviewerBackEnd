import React from "react";
import ClientGreeting from "../components/ClientGreeting";
import GuestGreeting from "../components/GuestGreeting";
import WebsitesList from "../components/WebsitesList";
import { useOutletContext } from "react-router-dom";

const HomePage = () => {
    const [isLoggedIn] = useOutletContext();

    return (
        <section>
            {isLoggedIn ? <ClientGreeting /> : <GuestGreeting />}
            
            {/* Pass the 'websites' prop to WebsitesList */}
            <WebsitesList websites={websites} />
        </section>
    );
};

export default HomePage;
