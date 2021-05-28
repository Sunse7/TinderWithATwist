import React, { useEffect, useState } from 'react';
import { GetProfile } from './Utils/GetProfile';
import * as S from './ShowNextProfile.styles';

export const ShowNextProfile = () => {

    const [picture, setPicture] = useState();
    const [currentProfile, setCurrentProfile] = useState();
    const isRandom = true;
    
    const handleNextProfile = async () => {
        const randomProfile = await GetProfile(isRandom);
        setCurrentProfile(randomProfile);
        setPicture(randomProfile.profilePicture);
    }

    const handleMatchProfile = async () => {

    }

    useEffect(() => {
        handleNextProfile();
    }, []);

    return (
        <> 
        {picture && 
            <S.Wrapper>
                <S.NextProfileButton onClick={handleNextProfile}>Nope! Next user</S.NextProfileButton>
                <S.MatchButton onClick={handleMatchProfile} >Match this doggo!</S.MatchButton>
                <S.ProfileName>{currentProfile.email}</S.ProfileName>
                <S.ProfileImage src={picture} /> 
                </S.Wrapper>
        }
        </>)
}