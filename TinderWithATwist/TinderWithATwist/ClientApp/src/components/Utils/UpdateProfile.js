import authService from '../api-authorization/AuthorizeService';
import { toBase64 } from './ToBase64';

export const updateProfile = async (userProfilePicture) => {
  const [token, isMe, user, profilePicture] = await Promise.all([authService.getAccessToken(), authService.isAuthenticated(), authService.getUser(), toBase64(userProfilePicture)]);
    
  if (isMe) {
    await fetch(`ApplicationUser/${user.sub}`, {
      method: 'PUT',
      headers: !token ? {} : {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profilePicture)
    });
  }
}