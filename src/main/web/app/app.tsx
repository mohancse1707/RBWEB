/*
 * Copyright (c) 2020. ReserveBuddy.
 * All rights reserved.
 * All data of ReserveBuddy are confidential.
 *
 *
 */

import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.less';
import './app.css';
import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Switch, withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import ErrorBoundary from 'app/shared/error/error-boundary';
import AppHeader from 'app/shared/template/header/header';
import AppRoutes from 'app/routes';
import { getAccount } from 'app/pages/customer/customer.slice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/shared/reducers';
import { hot } from 'react-hot-loader';
import { loadCountries } from 'app/shared/reducers/common.slice';
const baseHref = document.querySelector('base').getAttribute('href').replace(/\/$/, '');
const { Content, Footer } = Layout;

export interface IAppProps {
  appId: string;
}

export const App = (props: IAppProps) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.customerReducer);

  useEffect(() => {
    dispatch(getAccount());
    dispatch(loadCountries());
  }, []);

  return (
    <Router basename={baseHref}>
      <Layout>
        <ToastContainer position={toast.POSITION.TOP_RIGHT} />
        {window.location.pathname === '/' ? (
          <ErrorBoundary>
            <AppHeader showHeaderMenu isAuthenticated={isAuthenticated} />
          </ErrorBoundary>
        ) : (
          <ErrorBoundary>
            <AppHeader showHeaderMenu isAuthenticated={isAuthenticated} />
          </ErrorBoundary>
        )}
        <div id='app-view-container'>
          <ErrorBoundary>
            <Content className='site-layout' style={{ padding: '0 50px', marginTop: 64 }}>
              <div className='site-layout-background' style={{ padding: 24, minHeight: '100%' }}>
                <AppRoutes />
              </div>
            </Content>
          </ErrorBoundary>
          <Footer style={{ textAlign: 'center' }}>ReserveBuddy ©2021 </Footer>
        </div>
      </Layout>
    </Router>
  );
};

export default hot(module)(App);
