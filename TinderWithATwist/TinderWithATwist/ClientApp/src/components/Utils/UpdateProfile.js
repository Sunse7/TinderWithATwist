import authService from '../api-authorization/AuthorizeService';
import { toBase64 } from './ToBase64';

export const updateProfile = async (userProfilePicture) => {
    const [token, isMe, user, profilePicture] = await Promise.all([authService.getAccessToken(), authService.isAuthenticated(), authService.getUser(), toBase64(userProfilePicture)]);
     
    if (isMe) {
      const response = await fetch(`ApplicationUser/${user.sub}?base64Image=${profilePicture}?likedId=null`, {
        method: 'PUT',
        headers: !token ? {} : {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        
        body: JSON.stringify(profilePicture)
      });
    }
  }

  export const AddLikedUser = async (likedId) => {
    const [token, isMe, user] = await Promise.all([authService.getAccessToken(), authService.isAuthenticated(), authService.getUser()]);
    console.log('API id', likedId);
    if (isMe) {
        const response = await fetch(`ApplicationUser/${user.sub}?base64Image=${null}&likedId=${likedId}`, {
            method: 'PUT',
            headers: !token ? {} : {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
           
        });
        console.log('response', response);
    }
  }