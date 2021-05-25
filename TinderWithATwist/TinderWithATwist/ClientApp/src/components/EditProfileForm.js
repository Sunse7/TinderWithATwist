import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import authService from './api-authorization/AuthorizeService';
import { updateProfile } from './Utils/UpdateProfile';

export const EditProfileForm = () => {
    // const profileForm = useForm({
    //     reValidateMode: 'onChange', 
    //     mode: 'onBlur'
    // }); 
    const { register, handleSubmit } = useForm();
    const [selectedFile, setSelectedFile] = useState('');

    const onSubmit = () => {
        updateProfile(selectedFile);
        console.log(selectedFile);
    };

    useEffect(() => {
        
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <label>This is a cool label</label>
            <input placeholder='Pic' {...register} type='file' onChange={(e) => setSelectedFile(e.target.files[0])} />
            <button>Submit</button>
        </form>
    );
}