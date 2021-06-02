import authService from '../api-authorization/AuthorizeService';

export const GetMatchedProfiles = async (likedUsers) => {
    const [token, isMe, user] = await Promise.all([authService.getAccessToken(), authService.isAuthenticated(), authService.getUser()]);

    if (isMe) {
       let data;
        const response = await fetch(`ApplicationUser/${user.sub}?getLikedUsers=${likedUsers}`, {
            method: 'GET', 
            headers: !token ? {} : {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
        try{
             data = await response.json();
        }
        catch(error) {
            console.log('error', error);
        }

        return data;
    }
}