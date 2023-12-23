/*
 * Copyright (c) 2020. ReserveBuddy.
 * All rights reserved.
 * All data of ReserveBuddy are confidential.
 *
 *
 */

import React from 'react';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
// @ts-ignore
import DocsPage from './swagger-docs/swagger-api-page';
const Routes = ({ match }) => (
  <div>
    <ErrorBoundaryRoute exact path={`${match.url}/docs`} component={DocsPage} />
  </div>
);

export default Routes;
