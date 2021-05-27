import React, { useEffect, useState } from 'react';
import { GetProfile } from './Utils/GetProfile';

export const ShowNextProfile = () => {

    const [picture, setPicture] = useState();
    const [currentProfile, setCurrentProfile] = useState();
    const isRandom = true;
    
    useEffect(() => {
        async function FirstProfile() { //Rename this
            const randomProfile = await GetProfile(isRandom);
            setCurrentProfile(randomProfile);
            setPicture(randomProfile.profilePicture);
        }
        FirstProfile();
    }, []);

    const handleOnClick = async () => {
        const randomProfile = await GetProfile(isRandom);
        setCurrentProfile(randomProfile);
        setPicture(randomProfile.profilePicture);
    }

    return (
        <>
        <button onClick={handleOnClick}>Nope! Next user</button>
            {picture && 
                <> 
                <label>Cool new user</label>
                <img src={picture} /> 
                </>}
        </>
    )
}