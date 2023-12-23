/*
 * Copyright (c) 2020. ReserveBuddy.
 * All rights reserved.
 * All data of ReserveBuddy are confidential.
 *
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import Home from 'app/pages/home/home';
import PageNotFound from 'app/shared/error/page-not-found';
import { MyProfile } from 'app/pages/myaccount/myprofile/my-profile';
import PrivateRoute from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/settings/constants';
import { ChangePasswordComponent } from 'app/pages/myaccount/change-password/change-password';

const Admin = Loadable({
  loader: () => import(/* webpackChunkName: "administration" */ 'app/pages/administration'),
  loading: () => <div>loading ...</div>
});

const Routes = () => (
  <div className='view-routes'>
    <Switch>
      <ErrorBoundaryRoute path='/' exact component={Home} />
      <PrivateRoute path='/my-profile' component={MyProfile} hasAnyAuthorities={[AUTHORITIES.CUSTOMER]} />
      <PrivateRoute path='/change-password' component={ChangePasswordComponent} hasAnyAuthorities={[AUTHORITIES.CUSTOMER]} />
      <ErrorBoundaryRoute component={PageNotFound} />
    </Switch>
  </div>
);

export default Routes;
