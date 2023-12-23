/*
 * Copyright (c) 2020. ReserveBuddy.
 * All rights reserved.
 * All data of ReserveBuddy are confidential.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import AppComponent from './app';
import store from './settings/store';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import setupAxiosInterceptors from './settings/axios-interceptor';
import { clearAuthentication } from './pages/customer/customer.slice';
const rootEl = document.getElementById('root');

const actions = bindActionCreators({ clearAuthentication }, store.dispatch);
setupAxiosInterceptors(() => actions.clearAuthentication('login.error.unauthorized'));

const render = (Component) =>
  // eslint-disable-next-line react/no-render-return-value
  ReactDOM.render(
    <Provider store={store}>
      <div>
        <Component />
      </div>
    </Provider>,
    rootEl
  );

render(AppComponent);
