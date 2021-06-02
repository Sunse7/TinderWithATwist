import authService from '../api-authorization/AuthorizeService';

export const AddLikedUser = async (likedId) => {
    const [token, isMe, user] = await Promise.all([authService.getAccessToken(), authService.isAuthenticated(), authService.getUser()]);
    
    if (isMe) {
        await fetch(`ApplicationUser/${user.sub}?likedId=${likedId}`, {
            method: 'PUT',
            headers: !token ? {} : {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify("") 
        });
    }
  }