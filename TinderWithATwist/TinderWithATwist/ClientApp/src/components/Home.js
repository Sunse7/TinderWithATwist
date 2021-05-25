import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService';
import { EditProfileForm } from './EditProfileForm';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <EditProfileForm />
      </div>
    );
  }

  // const updateProfile = async (userProfile) => {
  //   const [token, isMe, user] = await Promise.all([authService.getAccessToken(), authService.isAuthenticated(), authService.getUser()]);
  //   if (isMe) {
  //     const response = await fetch('ApplicationUser', {
  //       method: 'PUT',
  //       headers: !token ? {} : {
  //         'Authorization' : `Bearer ${token}`,
  //         'Content-Type' : 'application/json'
  //       },
  //       body: JSON.stringify(userProfile)
  //     });
  //     const data = await response.json();
  //     return data;
  //   }
  // }
}
