import React, { useEffect, useState } from 'react';
import { GetProfile } from './Utils/GetProfile';
import * as S from './ShowNextProfile.styles';
import { AddLikedUser } from './Utils/AddLikedUser';

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
        const likedId = currentProfile.id;
        await AddLikedUser(likedId);
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