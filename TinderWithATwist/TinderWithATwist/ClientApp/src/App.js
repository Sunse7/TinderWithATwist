import React, { Component } from 'react';
import { Route } from 'react-router';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import { EditProfileForm } from './components/EditProfileForm';
import { Layout } from './components/Layout';
import { ShowMatchedProfiles } from './components/ShowMatchedProfiles';
import { ShowNextProfile } from './components/ShowNextProfile';
import './custom.css';


export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/show-matched-profiles' component={ShowMatchedProfiles} />
        <Route path='/edit-profile-form' component={EditProfileForm} />
        <AuthorizeRoute path='/show-next-profile' component={ShowNextProfile} />
        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
      </Layout>
    );
  }
}
