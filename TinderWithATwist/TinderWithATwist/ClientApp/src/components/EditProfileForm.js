import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import { updateProfile } from './Utils/UpdateProfile';
import { GetProfile } from './Utils/GetProfile';
import { toBase64 } from './Utils/ToBase64';
import * as S from './ShowNextProfile.styles';

export const EditProfileForm = () => {
    // const profileForm = useForm({
    //     reValidateMode: 'onChange', 
    //     mode: 'onBlur'
    // }); 
    const { register, handleSubmit } = useForm();
    const [selectedFile, setSelectedFile] = useState('');
    const [picture, setPicture] = useState();
    
    const onSubmit = async () => {
        await updateProfile(selectedFile);  
        const base64Pic = await toBase64(selectedFile);
        setPicture(base64Pic);
    };

    useEffect(() => {
        async function GetPicture() {
            const isRandom = false;
            const profile = await GetProfile(isRandom);
            if (!!profile.profilePicture) {
                setPicture(profile.profilePicture);
            }
        }
        GetPicture();
    }, []);
   
    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)} >
            <label>Add a profile picture</label>
            <input {...register} type='file' onChange={(e) => setSelectedFile(e.target.files[0])} />
            <button disabled={!selectedFile ? true : false } >Submit</button>
        </form>
        
        {picture && (
            <>
                <label>This is your profile picture</label> 
                <S.ProfileImage src={picture} />
            </>
        )}   
        </>
    );
}