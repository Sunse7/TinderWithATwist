import React, { Component } from 'react';
export class Home extends Component {
  static displayName = Home.name;

   //async componentDidMount(){
    
  //     const [token, isMe, user] = await Promise.all([authService.getAccessToken(), authService.isAuthenticated(), authService.getUser()]);
  //     //console.log('userProfile', userProfile);
       
  //     //console.log('64pic', profilePicture);
  //     if (isMe) {
  //       const response = await fetch(`ApplicationUser`, {
  //         method: 'PUT',
  //         headers: !token ? {} : {
            
  //           'Content-Type': 'application/json'
  //         },
          
  //         body: JSON.stringify( "hej")
  //       });
  //       const data = await response.json();
  //       console.log('token', token);
  //       //console.log('userProfile', userProfile);
  //       console.log('response', response);
  //     }
  // }

  render () {
    return (
      <div>
        
      </div>
    );
  }
}
