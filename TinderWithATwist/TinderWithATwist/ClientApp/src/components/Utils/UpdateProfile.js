import imageToBase64 from 'image-to-base64';
import authService from '../api-authorization/AuthorizeService';


const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const base64 = reader.result.replace('data:image/jpeg;base64,', ''); 
        resolve(base64); 
    }
    reader.onerror = error => reject(error);
});


export const updateProfile = async (userProfilePicture) => {
    const [token, isMe, user, profilePicture] = await Promise.all([authService.getAccessToken(), authService.isAuthenticated(), authService.getUser(), toBase64(userProfilePicture)]);
    //console.log('userProfile', userProfile);
     
    //console.log('64pic', profilePicture);
    if (isMe) {
      const response = await fetch(`ApplicationUser`, {
        method: 'PUT',
        headers: !token ? {} : {
          
          'Content-Type' : 'application/json'
        },
        
        body: JSON.stringify('hej')
      });
console.log('token', token);
      //console.log('userProfile', userProfile);
      console.log('response', response);
    }
  }