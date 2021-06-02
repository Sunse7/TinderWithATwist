import React, { useState } from "react";
import { GetMatchedProfiles } from "./Utils/GetMatchedProfiles";

export const ShowMatchedProfiles = () => {
    const [matchedProfiles, setMatchedProfiles] = useState([]);
    const likedUser = true;

    const handleMatchedProfiles = async () => {
        const profiles = await GetMatchedProfiles(likedUser);
        setMatchedProfiles(profiles);
    }

    return (
        <>
            <button onClick={handleMatchedProfiles}>See matches!</button>
            {matchedProfiles.map(profile => <p key={profile.email}>{profile.email}</p>)}
        </>
    )
}