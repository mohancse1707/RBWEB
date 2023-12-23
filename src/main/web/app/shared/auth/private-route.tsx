import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { RootState } from 'app/shared/reducers';
import ErrorBoundary from 'app/shared/error/error-boundary';
import { Storage } from 'app/shared/util/storage-util';

interface IOwnProps extends RouteProps {
  hasAnyAuthorities?: string[];
}

export interface IPrivateRouteProps extends IOwnProps, StateProps {}

export const PrivateRouteComponent = ({
  component: Component,
  isAuthenticated,
  isAuthorized,
  hasAnyAuthorities = [],
  ...rest
}: IPrivateRouteProps) => {
  const checkAuthorities = (props) =>
    isAuthorized ? (
      <ErrorBoundary>
        <Component {...props} />
      </ErrorBoundary>
    ) : (
      <div className='insufficient-authority'>
        <div className='alert alert-danger'>
          <div>You are not authorized to access this page.</div>
        </div>
      </div>
    );

  const renderRedirect = (props) => {
    const isLoggedIn = !!Storage.local.get('user-info');
    if (isLoggedIn) {
      return checkAuthorities(props);
    } else {
      return (
        <div>
          not logged
          <Redirect
            to={{
              pathname: '/',
              search: props.location.search,
              state: { from: props.location }
            }}
          />
        </div>
      );
    }
  };

  if (!Component) throw new Error(`A component needs to be specified for private route for path ${(rest as any).path}`);

  return <Route {...rest} render={renderRedirect} />;
};

export const hasAnyAuthority = (authorities: string[], hasAnyAuthorities: string[]) => {
  if (authorities && authorities.length !== 0) {
    if (hasAnyAuthorities.length === 0) {
      return true;
    }
    return hasAnyAuthorities.some((auth) => authorities.includes(auth));
  }
  return false;
};

const mapStateToProps = ({ customerReducer: { isAuthenticated, account } }: RootState, { hasAnyAuthorities = [] }: IOwnProps) => ({
  isAuthenticated,
  isAuthorized: hasAnyAuthority(account?.roles, hasAnyAuthorities)
});

type StateProps = ReturnType<typeof mapStateToProps>;

/**
 * A route wrapped in an authentication check so that routing happens only when you are authenticated.
 * Accepts same props as React router Route.
 * The route also checks for authorization if hasAnyAuthorities is specified.
 */
export const PrivateRoute = connect(mapStateToProps, null, null, { pure: false })(PrivateRouteComponent);

export default PrivateRoute;
